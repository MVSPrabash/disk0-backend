import { z } from 'zod';
import { FolderIdSchema } from './schema.js';

type FoldersParams = z.infer<typeof FolderIdSchema>;

export {
  FoldersParams,
}
