import express from 'express'
import UsersController from '../controllers/user'
import rightsValidation from '../middlewares/rights-validation'
import { asyncWrapper } from '../utils/asyncWrapper'
import { Roles } from '../types/users'
import setCurrentUserId from '../middlewares/set-current-user-id'

const usersRouter = express.Router()

usersRouter.get('/', asyncWrapper(UsersController.getAll))
usersRouter.get('/:id', asyncWrapper(UsersController.getOne))

usersRouter.get('/me', setCurrentUserId , asyncWrapper(UsersController.getOne))
usersRouter.patch('/update-me',setCurrentUserId, asyncWrapper(UsersController.updateMe))
usersRouter.post('/delete-me', setCurrentUserId, asyncWrapper(UsersController.deleteMe))

usersRouter.use(rightsValidation(Roles.Admin))
usersRouter.patch('/:id', asyncWrapper(UsersController.updateOne))
usersRouter.delete('/:id', asyncWrapper(UsersController.deleteOne))


export { usersRouter }
