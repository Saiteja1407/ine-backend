import express from 'express';
import Stripe from 'stripe';
import { constants } from '../constants/index.js';

const paymentRouter = express.Router();
const stripe = new Stripe(constants.STRIPE_SECRET_KEY);

paymentRouter.post('/create-payment-intent', async (req, res) => {
    const { total } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true,
        }
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

export default paymentRouter;