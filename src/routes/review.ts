import express from 'express';

import { asyncWrapper } from '../utils/asyncWrapper';
import ReviewController from '../controllers/review';

const reviewsRouter = express.Router({ mergeParams: true });

reviewsRouter.get('/', asyncWrapper(ReviewController.getAll));
reviewsRouter.post('/', asyncWrapper(ReviewController.create));

export { reviewsRouter };
