import express from 'express'
import ShopItemController from '../controllers/shopItem'
import authValidation from '../middlewares/auth-validation';
import { asyncWrapper } from '../utils/asyncWrapper';
import { reviewRouter } from './review';
import { uploadShopItemPhotos} from '../middlewares/upload-files';
import { resizeShopItemPhotos } from '../middlewares/resize-photo';


const shopItemsRouter = express.Router()
shopItemsRouter.use(authValidation)

shopItemsRouter.use('/:shopItemId/reviews', reviewRouter)

shopItemsRouter.get('/', asyncWrapper(ShopItemController.getAll))
shopItemsRouter.get('/:id', asyncWrapper(ShopItemController.getOne))
shopItemsRouter.post('/', asyncWrapper(ShopItemController.create))
shopItemsRouter.patch('/:id', uploadShopItemPhotos, resizeShopItemPhotos,  asyncWrapper(ShopItemController.updateOne))
shopItemsRouter.delete('/:id', asyncWrapper(ShopItemController.deleteOne))

export { shopItemsRouter }