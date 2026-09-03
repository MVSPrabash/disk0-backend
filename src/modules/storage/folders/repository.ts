import pool from '../../../config/db.js';

const getFolderContents = async (folderId: string, userId: string) => {
  const metadata = await pool.query(
    `
    SELECT * FROM folders
    WHERE id = $1 AND user_id = $2
    `,
    [folderId, userId]
  );

  const folders = await pool.query(
    `
    SELECT id, name, created_at, updated_at FROM folders
    WHERE parent_id = $1 AND user_id = $2;
    `,
    [folderId, userId]
  );

  const files = await pool.query(
    `
    SELECT id, name, mime_type, size, created_at, updated_at FROM files
    WHERE folder_id = $1 AND user_id = $2;
    `,
    [folderId, userId]
  );

  return {
    'metadata': metadata.rows[0],
    'folders': folders.rows,
    'files': files.rows
  };
};

const getRootFolderContents = async (userId: string) => {
  const metadata = await pool.query(
    `
    SELECT * FROM folders
    WHERE user_id = $1 AND parent_id IS NULL;
    `,
    [userId]
  );

  const rootFolderId = metadata.rows[0].id;

  const folders = await pool.query(
    `
    SELECT id, name, created_at, updated_at FROM folders
    WHERE user_id = $1 AND parent_id = $2;
    `,
    [userId, rootFolderId]
  );

  const files = await pool.query(
    `
    SELECT id, name, mime_type, size, created_at, updated_at FROM files
    WHERE user_id = $1 AND folder_id = $2;
    `,
    [userId, rootFolderId]
  );

  return {
    metadata: metadata.rows[0],
    folders: folders.rows,
    files: files.rows
  };
};

export {
  getFolderContents,
  getRootFolderContents,
}