import express from 'express'
import { asyncWrapper } from '../utils/asyncWrapper';
import ShopController from '../controllers/shop';


const shopsRouter = express.Router()

shopsRouter.get('/', asyncWrapper(ShopController.getAll))
shopsRouter.get('/within/:distance/center/:latlng/unit/:unit', asyncWrapper(ShopController.getWithin))
shopsRouter.post('/', asyncWrapper(ShopController.create))

export { shopsRouter }