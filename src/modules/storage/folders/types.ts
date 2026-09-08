import { z } from 'zod';

import {
  CreateFolderSchema,
  FolderIdSchema,
} from './schema.js';

type FoldersParams = z.infer<typeof FolderIdSchema>;

type CreateFolderBody = z.infer<typeof CreateFolderSchema>;

export {
  FoldersParams,
  CreateFolderBody,
}
