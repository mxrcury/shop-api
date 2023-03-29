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
usersRouter.patch('/me', asyncWrapper(UsersController.updateMyProfile))
usersRouter.post('/delete-me', asyncWrapper(UsersController.deleteMyProfile))

usersRouter.use(rightsValidation(Roles.Admin))
usersRouter.patch('/:id', asyncWrapper(UsersController.updateOne))
usersRouter.delete('/:id', asyncWrapper(UsersController.deleteOne))


export { usersRouter }
