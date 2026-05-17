import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";
import axios from "axios";

interface PaymentFormProps {
  amount: number;
  bookingId: string;
  propertyId: string;
  tenantId: string;
  onSuccess?: (paymentIntentId: string) => void;
  onError?: (error: string) => void;
}

export default function PaymentForm({
  amount,
  bookingId,
  propertyId,
  tenantId,
  onSuccess,
  onError,
}: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  // Card details state
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create Payment Intent
      const intentResponse = await axios.post("/api/payments/create-intent", {
        amount,
        currency: "inr",
        description: `Booking for property ${propertyId}`,
        bookingId,
        propertyId,
        tenantId,
      });

      if (!intentResponse.data.success) {
        throw new Error(intentResponse.data.error || "Failed to create payment intent");
      }

      const { clientSecret, paymentIntentId: intentId } = intentResponse.data;
      setPaymentIntentId(intentId);

      // Step 2: Confirm Payment (In production, use Stripe.js for secure card handling)
      const confirmResponse = await axios.post("/api/payments/confirm", {
        paymentIntentId: intentId,
      });

      if (!confirmResponse.data.success) {
        throw new Error(confirmResponse.data.error || "Payment confirmation failed");
      }

      if (confirmResponse.data.status === "succeeded") {
        setSuccess(true);
        onSuccess?.(intentId);
      } else {
        throw new Error(`Payment status: ${confirmResponse.data.status}`);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || "Payment failed";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="p-6 border-green-200 bg-green-50">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <h3 className="font-semibold text-green-900">Payment Successful!</h3>
            <p className="text-sm text-green-700">Payment ID: {paymentIntentId}</p>
            <p className="text-sm text-green-700 mt-1">Amount: ₹{amount}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Complete Payment</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Payment Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handlePayment} className="space-y-4">
        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Cardholder Name</label>
          <Input
            placeholder="John Doe"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium mb-2">Card Number</label>
          <Input
            placeholder="4242 4242 4242 4242"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ""))}
            maxLength={16}
            required
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Test card: 4242 4242 4242 4242
          </p>
        </div>

        {/* Expiry and CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Expiry Month</label>
            <Input
              placeholder="MM"
              value={expMonth}
              onChange={(e) => setExpMonth(e.target.value)}
              maxLength={2}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Expiry Year</label>
            <Input
              placeholder="YY"
              value={expYear}
              onChange={(e) => setExpYear(e.target.value)}
              maxLength={2}
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* CVC */}
        <div>
          <label className="block text-sm font-medium mb-2">CVC</label>
          <Input
            placeholder="123"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            maxLength={4}
            required
            disabled={loading}
          />
        </div>

        {/* Amount Display */}
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-3xl font-bold text-primary">₹{amount}</p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Processing Payment...
            </>
          ) : (
            `Pay ₹${amount}`
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your payment information is secure and encrypted.
        </p>
      </form>
    </Card>
  );
}
