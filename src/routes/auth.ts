import express from 'express'
import { asyncWrapper } from '../utils/asyncWrapper'
import AuthController from '../controllers/auth'
import authValidation from '../middlewares/auth-validation'

const authRouter = express.Router()

authRouter.post('/signup',asyncWrapper(AuthController.signUp))
authRouter.post('/login',asyncWrapper(AuthController.login))
authRouter.get('/confirmEmail/:token', asyncWrapper(AuthController.confirmEmail))
authRouter.post('/forgotPassword', asyncWrapper(AuthController.forgotPassword))
authRouter.post('/resetPassword/:token', asyncWrapper(AuthController.resetPassword))
authRouter.patch('/changePassword', authValidation, asyncWrapper(AuthController.updatePassword))

export { authRouter }