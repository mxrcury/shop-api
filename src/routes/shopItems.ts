import express from 'express';

import ShopItemController from '../controllers/shopItem';
import authValidation from '../middlewares/auth-validation';
import { asyncWrapper } from '../utils/asyncWrapper';
import { reviewsRouter } from './review';
import { uploadShopItemPhotos } from '../middlewares/upload-files';
import { resizeShopItemPhotos } from '../middlewares/resize-photo';
import { paymentRouter } from './payment';
import rightsValidation from '../middlewares/rights-validation';
import { Roles } from '../types/users';

const shopItemsRouter = express.Router({ mergeParams: true });
shopItemsRouter.use(authValidation);

shopItemsRouter.use('/:shopItemId/reviews', reviewsRouter);
shopItemsRouter.use('/', paymentRouter);

shopItemsRouter.get('/', asyncWrapper(ShopItemController.getAll));
shopItemsRouter.get('/:id', asyncWrapper(ShopItemController.getOne));
shopItemsRouter.post(
  '/',
  // rightsValidation(Roles.Seller),
  asyncWrapper(ShopItemController.create)
);
shopItemsRouter.patch(
  '/:id',
  rightsValidation(Roles.Seller, Roles.Admin),
  uploadShopItemPhotos,
  resizeShopItemPhotos,
  asyncWrapper(ShopItemController.updateOne)
);
shopItemsRouter.delete('/:id', asyncWrapper(ShopItemController.deleteOne));

export { shopItemsRouter };
