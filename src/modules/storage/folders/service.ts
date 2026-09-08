import {
  getFolderContents,
  getRootFolderId,
  createFolder,
  folderExistsById,
  folderExistsByName,
  deleteFolder,
} from './repository.js';

import ConflictError from '../../../errors/ConflictError.js';
import NotFoundError from '../../../errors/NotFoundError.js';

const getFolderService = async (folderId: string, userId: string) => {
  const contents = await getFolderContents(folderId, userId);

  return contents;
};

const getRootFolderService = async (userId: string) => {
  const rootId = await getRootFolderId(userId);

  const contents = await getFolderContents(rootId, userId);

  return contents;
};

const createFolderService = async (userId: string, parentId: string, name: string) => {
  const parentExists = await folderExistsById(userId, parentId);

  if (!parentExists) {
    throw new NotFoundError('Parent Folder not found');
  }
  
  const exists = await folderExistsByName(userId, name);

  if (exists) {
    throw new ConflictError('Folder already exists');
  }

  const metadata = await createFolder(userId, parentId, name);

  return metadata;
};

/**
 * @todo must not delete user root folder
*/
const deleteFolderService = async (
  userId: string,
  folderId: string
) => {

  const exists = await folderExistsById(userId, folderId);

  if (!exists) {
    throw new NotFoundError('Folder not found');
  }

  await deleteFolder(userId, folderId);
};

export {
  getFolderService,
  getRootFolderService,
  createFolderService,
  deleteFolderService,
}