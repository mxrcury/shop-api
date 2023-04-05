import Stripe from 'stripe';

class PaymentService {
  private controller: Stripe;
  constructor() { }

  async initialize(): Promise<void> {
    this.controller = new Stripe(process.env.STRIPE_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async getPaymentSessionById(id: string): Promise<any> {
    if (!this.controller) this.initialize();

    const session = this.controller.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${'https://www.youtube.com/watch?v=t0ptMtKDoZ4'}`,
      cancel_url: `https://www.youtube.com/watch?v=0OrmKCB0UrQ`,
      customer_email: 'honchar@duck.com',
      mode: 'payment',
      client_reference_id: id,
      line_items: [
        {
          price: 'price_1MsnG8Dti8hJ50EBPkidFo1c',
          quantity: 1,
        },
      ],
    });
    console.log(session);
    return session;
  }
}

export default new PaymentService();
