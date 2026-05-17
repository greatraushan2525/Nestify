import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export interface PaymentIntentData {
  amount: number;
  currency: string;
  description: string;
  metadata?: Record<string, string>;
}

export interface PaymentMethodData {
  type: string;
  card: {
    number: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
  };
}

/**
 * Create a payment intent for booking
 */
export async function createPaymentIntent(data: PaymentIntentData) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100), // Convert to cents
      currency: data.currency || "inr",
      description: data.description,
      metadata: data.metadata || {},
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error: any) {
    console.error("❌ Stripe Payment Intent Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Confirm payment intent
 */
export async function confirmPaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return {
      success: true,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
    };
  } catch (error: any) {
    console.error("❌ Stripe Confirmation Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Create a customer for recurring charges
 */
export async function createCustomer(email: string, name: string) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });

    return {
      success: true,
      customerId: customer.id,
    };
  } catch (error: any) {
    console.error("❌ Stripe Customer Creation Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Create a refund
 */
export async function createRefund(paymentIntentId: string, amount?: number) {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    });

    return {
      success: true,
      refundId: refund.id,
      amount: refund.amount / 100,
    };
  } catch (error: any) {
    console.error("❌ Stripe Refund Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Retrieve payment intent details
 */
export async function getPaymentIntentDetails(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return {
      success: true,
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      clientSecret: paymentIntent.client_secret,
      metadata: paymentIntent.metadata,
    };
  } catch (error: any) {
    console.error("❌ Stripe Retrieve Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default stripe;
