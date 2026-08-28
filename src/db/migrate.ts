import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import pool from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const migrationsDir = join(__dirname, '../../migrations');

async function ensureMigrationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT NOT NULL UNIQUE,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function getMigrationFiles() {
  const files = await readdir(migrationsDir);

  return files
    .filter((file) => file.endsWith('.sql'))
    .sort();
}

async function getAppliedMigrations() {
  const result = await pool.query<{ filename: string }>(
    'SELECT filename FROM schema_migrations'
  );

  return new Set(result.rows.map((row) => row.filename));
}

async function applyMigration(filename: string) {
  const filepath = join(migrationsDir, filename);
  const sql = await readFile(filepath, 'utf8');

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(sql);

    await client.query(
      'INSERT INTO schema_migrations (filename) VALUES ($1)',
      [filename]
    );

    await client.query('COMMIT');

    console.log(`Applied migration: ${filename}`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function migrate() {
  await ensureMigrationsTable();

  const files = await getMigrationFiles();
  const applied = await getAppliedMigrations();

  for (const filename of files) {
    if (applied.has(filename)) {
      continue;
    }

    await applyMigration(filename);
  }

  console.log('Migrations complete.');
}

migrate()
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  })
  .finally(() => {
    pool.end();
  });