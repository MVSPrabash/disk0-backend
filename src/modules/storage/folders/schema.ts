import { z } from 'zod';

const FolderIdSchema = z.object({
  id: z.uuid()
});

export {
  FolderIdSchema,
};
