import Stripe from "stripe";

// Ensure STRIPE_SECRET_KEY is set before using it
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

// Initialize Stripe with the latest API version
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia",
});

export default stripe;
