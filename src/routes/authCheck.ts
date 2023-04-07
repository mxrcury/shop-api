import express from 'express';
import { usersRouter } from './users';
import { shopItemsRouter } from './shopItems';
import { reviewsRouter } from './review';
import { shopsRouter } from './shop';
import { tagsRouter } from './tag';

const authCheckRouter = express.Router();

authCheckRouter.use('/users', usersRouter);
authCheckRouter.use('/shopItems', shopItemsRouter);
authCheckRouter.use('/reviews', reviewsRouter);
authCheckRouter.use('/shops', shopsRouter);
authCheckRouter.use('/tags', tagsRouter);

export { authCheckRouter };
