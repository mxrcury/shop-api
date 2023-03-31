import express from 'express'
import { asyncWrapper } from '../utils/asyncWrapper'
import ReviewController from '../controllers/review'

const reviewRouter = express.Router({ mergeParams:true })

reviewRouter.get('/', asyncWrapper(ReviewController.getAll))
reviewRouter.post('/', asyncWrapper(ReviewController.create))

export { reviewRouter }