import express from 'express'
import UsersController from '../controllers/user'
import rightsValidation from '../middlewares/rights-validation'
import { asyncWrapper } from '../utils/asyncWrapper'
import { Roles } from '../types/users'

const usersRouter = express.Router()

usersRouter.get('/', asyncWrapper(UsersController.getAll))
usersRouter.get('/:id', asyncWrapper(UsersController.getOne))
usersRouter.post('/update-my-profile', asyncWrapper(UsersController.updateMyProfile))
usersRouter.delete('/delete-my-profile', asyncWrapper(UsersController.deleteMyProfile))

usersRouter.use(rightsValidation(Roles.Admin))

usersRouter.patch('/:id', asyncWrapper(UsersController.updateOne))
usersRouter.delete('/:id', asyncWrapper(UsersController.deleteOne))


export { usersRouter }
