import express from 'express'
import { usersRouter } from './users'
import { shopItemsRouter } from './shopItems'

const authCheckRouter = express.Router()

authCheckRouter.use('/users', usersRouter)
authCheckRouter.use('/shopItems', shopItemsRouter)

export { authCheckRouter }