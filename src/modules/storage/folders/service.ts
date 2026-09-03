import {
  getFolderContents,
} from './repository.js';

const getFolderService = async (folderId: string, userId: string) => {
  const contents = await getFolderContents(folderId, userId);

  return contents;
};

export {
  getFolderService,
}