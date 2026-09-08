import type { Request, Response, NextFunction } from 'express';

import {
  getFolderService,
  getRootFolderService,
  createFolderService,
} from './service.js';

import {
  CreateFolderBody,
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

const getRootFolderController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;

  if (!userId) {        // Never true
    next(new Error());
    return ;
  }

  const result = await getRootFolderService(userId);

  res.json({
    metadata: result.metadata,
    folders: result.folders,
    files: result.files
  });
};

const createFolderController = async (
  req: Request<any, CreateFolderBody>,
  res: Response, next: NextFunction
) => {

  const userId = req.user?.id;

  if (!userId) { // Never true
    next(new Error());
    return ;
  }

  const parentId = req.body.parent_id;
  const name = req.body.name;

  const result = await createFolderService(userId, parentId, name);

  res.json({
    success: true,
    result
  });
};

export {
  getFolderController,
  getRootFolderController,
  createFolderController,
}