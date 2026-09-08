import {
  getFolderContents,
  getRootFolderContents,
  createFolder,
  folderExistsById,
  folderExistsByName,
} from './repository.js';

import ConflictError from '../../../errors/ConflictError.js';
import NotFoundError from '../../../errors/NotFoundError.js';

const getFolderService = async (folderId: string, userId: string) => {
  const contents = await getFolderContents(folderId, userId);

  return contents;
};

const getRootFolderService = async (userId: string) => {
  const contents = await getRootFolderContents(userId);

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
}

export {
  getFolderService,
  getRootFolderService,
  createFolderService,
}