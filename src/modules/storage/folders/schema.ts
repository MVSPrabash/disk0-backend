import { z } from 'zod';

const FolderIdSchema = z.object({
  id: z.uuid()
});

const CreateFolderSchema = z.object({
  parent_id: z.uuid(),
  name: z.string().min(1),
});

export {
  FolderIdSchema,
  CreateFolderSchema,
};
