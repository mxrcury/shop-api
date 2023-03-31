import express from 'express'
import { usersRouter } from './users'
import { shopItemsRouter } from './shopItems'
import { reviewRouter } from './review'

const authCheckRouter = express.Router()

authCheckRouter.use('/users', usersRouter)
authCheckRouter.use('/shopItems', shopItemsRouter)
authCheckRouter.use('/reviews', reviewRouter)

export { authCheckRouter }