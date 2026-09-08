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

const getRootFolderId = async (userId: string) => {
  const result = await pool.query(
    `
    SELECT id FROM folders
    WHERE user_id = $1 AND parent_id IS NULL;
    `,
    [userId]
  );

  return result.rows[0].id;
};

const createRootFolder = async (userId: string) => {
  await pool.query(
    `
    INSERT INTO folders (user_id, parent_id, name)
      VALUES ($1, NULL, 'root');
    `,
    [userId]
  );
};

const createFolder = async (userId: string, parentId: string, name: string) => {
  const result = await pool.query(
    `
    INSERT INTO folders (user_id, parent_id, name)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [userId, parentId, name]
  );

  return result.rows[0];
};

const folderExistsByName = async (userId: string, name: string): Promise<boolean> => {
  const result = await pool.query(
    `
    SELECT FROM folders
    WHERE user_id = $1 AND name = $2;
    `,
    [userId, name]
  );

  return result.rowCount != 0;
}

const folderExistsById = async (userId: string, id: string): Promise<boolean> => {
  const result = await pool.query(
    `
    SELECT FROM folders
    WHERE user_id = $1 AND id = $2;
    `,
    [userId, id]
  );

  return result.rowCount != 0;
};

const deleteFolder = async (userId: string, folderId: string) => {
  await pool.query(
    `
    DELETE FROM folders
    WHERE user_id = $1 AND id = $2;
    `,
    [userId, folderId]
  );
};

export {
  getFolderContents,
  getRootFolderId,
  createRootFolder,
  createFolder,
  folderExistsById,
  folderExistsByName,
  deleteFolder,
}