import express from 'express';

import { authRouter } from './auth';
import { authCheckRouter } from './authCheck';
import authValidation from '../middlewares/auth-validation';
import { asyncWrapper } from '../utils/asyncWrapper';

const rootRouter = express.Router();

rootRouter.use('/api', asyncWrapper(authValidation), authCheckRouter);
rootRouter.use('/auth', authRouter);

export { rootRouter };
