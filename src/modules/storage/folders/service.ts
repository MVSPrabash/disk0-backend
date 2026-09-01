import {
  getFolderContents,
} from './repository.js';

const getFolderService = async (id: string) => {
  const contents = await getFolderContents(id);

  return contents;
};

export {
  getFolderService,
}