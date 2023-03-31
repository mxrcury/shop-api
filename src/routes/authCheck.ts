import express from 'express'
import { usersRouter } from './users'
import { shopItemsRouter } from './shopItems'
import { reviewRouter } from './review'
import { shopsRouter } from './shop'

const authCheckRouter = express.Router()

authCheckRouter.use('/users', usersRouter)
authCheckRouter.use('/shopItems', shopItemsRouter)
authCheckRouter.use('/reviews', reviewRouter)
authCheckRouter.use('/shops', shopsRouter)

export { authCheckRouter }