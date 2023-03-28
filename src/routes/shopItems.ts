import express from 'express'
import ShopItemController from '../controllers/shopItem'
import authValidation from '../middlewares/auth-validation';
import { asyncWrapper } from '../utils/asyncWrapper';


const shopItemsRouter = express.Router()
shopItemsRouter.use(authValidation)

// shopItemsRouter.route('/:shopItemId/tags', asyncWrapper(tagRouter))

shopItemsRouter.get('/', asyncWrapper(ShopItemController.getAll))
shopItemsRouter.get('/:id', asyncWrapper(ShopItemController.getOne))
shopItemsRouter.post('/', asyncWrapper(ShopItemController.create))

export { shopItemsRouter }