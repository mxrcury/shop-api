import express from 'express';

import UsersController from '../controllers/user';
import { asyncWrapper } from '../utils/asyncWrapper';
import { uploadUserPhoto } from '../middlewares/upload-files';
import { resizeUserPhoto } from '../middlewares/resize-photo';

const usersRouter = express.Router();

usersRouter.get('/', asyncWrapper(UsersController.getAll));
usersRouter.get('/:id', asyncWrapper(UsersController.getOne));
usersRouter.patch(
  '/:id',
  uploadUserPhoto,
  resizeUserPhoto,
  asyncWrapper(UsersController.updateOne)
);
usersRouter.delete('/:id', asyncWrapper(UsersController.deleteOne));

export { usersRouter };
