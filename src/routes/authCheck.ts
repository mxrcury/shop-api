import express from 'express';

import { usersRouter } from './users';
import { shopsRouter } from './shop';
import { tagsRouter } from './tag';
import { categoriesRouter } from './category';

const authCheckRouter = express.Router();

authCheckRouter.use('/users', usersRouter);
authCheckRouter.use('/categories', categoriesRouter);
authCheckRouter.use('/shops', shopsRouter);
authCheckRouter.use('/tags', tagsRouter);

export { authCheckRouter };
