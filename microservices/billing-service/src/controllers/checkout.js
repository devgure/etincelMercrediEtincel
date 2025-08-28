// services/billing-service/src/controllers/checkout.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{
      price: 'price_monthly_premium',
      quantity: 1,
    }],
    success_url: `${req.body.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: req.body.cancelUrl,
  });
  res.json({ id: session.id });
};