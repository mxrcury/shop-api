import express from 'express';

import CategoryController from '../controllers/category';
import { asyncWrapper } from '../utils/asyncWrapper';
import { shopItemsRouter } from './shopItems';

const categoriesRouter = express.Router({ mergeParams: true });

categoriesRouter.use('/categoryId?/shopItems', shopItemsRouter);

categoriesRouter.get('/', asyncWrapper(CategoryController.getAll));
categoriesRouter.post('/', asyncWrapper(CategoryController.create));

export { categoriesRouter };
