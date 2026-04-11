import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Calendar, Users, CreditCard, CheckCircle } from "lucide-react";
import { Property } from "@/lib/propertyData";
import { toast } from "sonner";

/**
 * Instant Booking Component - Quick booking modal with date selection and payment
 * Allows users to book properties instantly with date picker and payment options
 */

interface InstantBookingProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function InstantBooking({ property, isOpen, onClose }: InstantBookingProps) {
  const [step, setStep] = useState<"details" | "payment" | "confirmation">("details");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "wallet">("card");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [bookingId, setBookingId] = useState("");

  const calculateDays = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays();
  const totalPrice = property.price * days;

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate || !cardDetails.name || !cardDetails.email || !cardDetails.phone) {
      toast.error("Please fill all details");
      return;
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    setStep("payment");
  };

  const handlePayment = () => {
    // Simulate payment processing
    toast.loading("Processing payment...");
    setTimeout(() => {
      const id = `BK${Date.now()}`;
      setBookingId(id);
      setStep("confirmation");
      toast.success("Booking confirmed!");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary p-6 text-white flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold">Book {property.name}</h2>
            <p className="text-sm opacity-90">₹{property.price}/month</p>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 rounded-full p-2 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Step Indicator */}
          <div className="flex gap-2 mb-6">
            <div className={`flex-1 h-1 rounded-full ${step === "details" ? "bg-primary" : "bg-muted"}`} />
            <div className={`flex-1 h-1 rounded-full ${step === "payment" ? "bg-primary" : "bg-muted"}`} />
            <div className={`flex-1 h-1 rounded-full ${step === "confirmation" ? "bg-primary" : "bg-muted"}`} />
          </div>

          {/* Details Step */}
          {step === "details" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Check-in Date
                </label>
                <Input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Check-out Date
                </label>
                <Input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Number of Guests
                </label>
                <Input
                  type="number"
                  min="1"
                  max="4"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={cardDetails.email}
                  onChange={(e) => setCardDetails({ ...cardDetails, email: e.target.value })}
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={cardDetails.phone}
                  onChange={(e) => setCardDetails({ ...cardDetails, phone: e.target.value })}
                  className="rounded-lg"
                />
              </div>

              {/* Price Summary */}
              {days > 0 && (
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">₹{property.price} × {days} days</span>
                    <span className="font-semibold">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Security Deposit</span>
                    <span className="font-semibold">₹{property.price}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{totalPrice + property.price}</span>
                  </div>
                </div>
              )}

              <Button
                className="w-full rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold"
                onClick={handleBooking}
              >
                Proceed to Payment
              </Button>
            </div>
          )}

          {/* Payment Step */}
          {step === "payment" && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-blue-900 mb-2">Booking Summary</p>
                <div className="text-xs text-blue-800 space-y-1">
                  <p>Guest: {cardDetails.name}</p>
                  <p>Check-in: {new Date(checkInDate).toLocaleDateString()}</p>
                  <p>Check-out: {new Date(checkOutDate).toLocaleDateString()}</p>
                  <p className="font-semibold text-blue-900 mt-2">Total: ₹{totalPrice + property.price}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  <CreditCard className="w-4 h-4 inline mr-2" />
                  Payment Method
                </label>
                <div className="space-y-2">
                  {["card", "upi", "wallet"].map((method) => (
                    <label key={method} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <span className="font-medium text-foreground capitalize">{method === "card" ? "Credit/Debit Card" : method === "upi" ? "UPI" : "Digital Wallet"}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800">
                  ⚠️ This is a demo booking. No actual payment will be processed.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-lg"
                  onClick={() => setStep("details")}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold"
                  onClick={handlePayment}
                >
                  Pay ₹{totalPrice + property.price}
                </Button>
              </div>
            </div>
          )}

          {/* Confirmation Step */}
          {step === "confirmation" && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Booking Confirmed!
                </h3>
                <p className="text-muted-foreground text-sm">Your booking has been successfully confirmed.</p>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Booking ID</span>
                  <span className="font-mono font-semibold">{bookingId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Property</span>
                  <span className="font-semibold">{property.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Check-in</span>
                  <span className="font-semibold">{new Date(checkInDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">{days} days</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{totalPrice + property.price}</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800">
                  ✓ A confirmation email has been sent to {cardDetails.email}
                </p>
              </div>

              <Button
                className="w-full rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
