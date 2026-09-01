import pool from '../../../config/db.js';

const getFolderContents = async (id: string) => {
  const metadata = await pool.query(
    `
    SELECT * FROM folders
    WHERE id = $1;
    `,
    [id]
  );

  const folders = await pool.query(
    `
    SELECT id, name, created_at, updated_at FROM folders
    WHERE parent_id = $1;
    `,
    [id]
  );

  const files = await pool.query(
    `
    SELECT id, name, mime_type, size, created_at, updated_at FROM files
    WHERE folder_id = $1
    `,
    [id]
  );

  return {
    'metadata': metadata.rows[0],
    'folders': folders.rows,
    'files': files.rows
  };
};

export {
  getFolderContents,
}