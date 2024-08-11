import Stripe from 'stripe';

import { env } from '@/env.mjs';

export const stripeAdmin = new Stripe(env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2023-10-16',
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: 'UPDATE_THIS_WITH_YOUR_STRIPE_APP_NAME',
    version: '0.1.0',
  },
});
