import {
  getFolderContents,
  getRootFolderContents,
} from './repository.js';

const getFolderService = async (folderId: string, userId: string) => {
  const contents = await getFolderContents(folderId, userId);

  return contents;
};

const getRootFolderService = async (userId: string) => {
  const contents = await getRootFolderContents(userId);

  return contents;
};

export {
  getFolderService,
  getRootFolderContents,
}