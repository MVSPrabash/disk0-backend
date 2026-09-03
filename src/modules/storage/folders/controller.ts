import type { Request, Response, NextFunction } from 'express';
import { getFolderService } from './service.js';

import {
  FoldersParams
} from './types.js';
import UnauthorizedError from '../../../errors/UnauthorizedError.js';

const getFolderController = async (req: Request<FoldersParams>, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  const folderId = req.params.id;

  if (!userId) {    // Never true, just for typescript's sake
    next(new UnauthorizedError());
    return ;
  }

  const result = await getFolderService(folderId, userId);

  res.status(200).json({
    'metadata': result.metadata,
    'folders': result.folders,
    'files': result.files
  });
}

export {
  getFolderController,
}