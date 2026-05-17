import { Router, Request, Response } from "express";
import {
  createPaymentIntent,
  confirmPaymentIntent,
  createCustomer,
  createRefund,
  getPaymentIntentDetails,
} from "../services/stripe.service";

const router = Router();

/**
 * POST /api/payments/create-intent
 * Create a payment intent for booking
 */
router.post("/create-intent", async (req: Request, res: Response) => {
  try {
    const { amount, currency, description, bookingId, propertyId, tenantId } = req.body;

    if (!amount || !description) {
      return res.status(400).json({ error: "Amount and description are required" });
    }

    const result = await createPaymentIntent({
      amount,
      currency: currency || "inr",
      description,
      metadata: {
        bookingId: bookingId?.toString() || "",
        propertyId: propertyId?.toString() || "",
        tenantId: tenantId?.toString() || "",
      },
    });

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/payments/confirm
 * Confirm a payment intent
 */
router.post("/confirm", async (req: Request, res: Response) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: "Payment Intent ID is required" });
    }

    const result = await confirmPaymentIntent(paymentIntentId);

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/payments/customer
 * Create a Stripe customer
 */
router.post("/customer", async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: "Email and name are required" });
    }

    const result = await createCustomer(email, name);

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/payments/refund
 * Create a refund for a payment
 */
router.post("/refund", async (req: Request, res: Response) => {
  try {
    const { paymentIntentId, amount } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: "Payment Intent ID is required" });
    }

    const result = await createRefund(paymentIntentId, amount);

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/payments/:paymentIntentId
 * Get payment intent details
 */
router.get("/:paymentIntentId", async (req: Request, res: Response) => {
  try {
    const { paymentIntentId } = req.params;

    const result = await getPaymentIntentDetails(paymentIntentId);

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
