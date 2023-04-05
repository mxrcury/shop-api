import express from 'express';
import { ControllerResponse } from '../types/controllers';
import PaymentService from '../services/payment';
import { Stripe } from 'stripe';

class PaymentController {
  async getSession(
    req: express.Request<{ shopItemId: string }>,
    res: express.Response<Stripe.Response<Stripe.Checkout.Session>>
  ): ControllerResponse<Stripe.Response<Stripe.Checkout.Session>> {
    const { shopItemId } = req.params;

    const data = await PaymentService.getPaymentSessionById(shopItemId);

    return res.status(200).send(data);
  }
}

export default new PaymentController();
