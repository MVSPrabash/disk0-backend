import type { Request, Response, NextFunction } from 'express';
import { getFolderService } from './service.js';

import {
  FoldersParams
} from './types.js';

const getFolderController = async (req: Request<FoldersParams>, res: Response, next: NextFunction) => {
  const result = await getFolderService(req.params.id);

  res.status(200).json({
    'metadata': result.metadata,
    'folders': result.folders,
    'files': result.files
  });
}

export {
  getFolderController,
}