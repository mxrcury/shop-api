import express from 'express';
import paymentController from '../controllers/payment';
import { asyncWrapper } from '../utils/asyncWrapper';

const paymentRouter = express.Router();

paymentRouter.get(
  '/:shopItemId/payment-session',
  asyncWrapper(paymentController.getSession)
);

export { paymentRouter };
