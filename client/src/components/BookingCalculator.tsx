import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { calculateRent, formatPrice, type BookingPeriod } from "@/lib/pricingUtils";
import { Calendar, DollarSign } from "lucide-react";

interface BookingCalculatorProps {
  propertyName: string;
  pricePerMonth: number;
  propertyId: string;
  onBook?: (details: {
    propertyId: string;
    bookingPeriod: BookingPeriod;
    duration: number;
    totalPrice: number;
  }) => void;
}

export default function BookingCalculator({
  propertyName,
  pricePerMonth,
  propertyId,
  onBook,
}: BookingCalculatorProps) {
  const [bookingPeriod, setBookingPeriod] = useState<BookingPeriod>("monthly");
  const [duration, setDuration] = useState(1);

  const pricing = calculateRent(pricePerMonth, bookingPeriod, duration);

  const handleBook = () => {
    onBook?.({
      propertyId,
      bookingPeriod,
      duration,
      totalPrice: pricing.totalPrice,
    });
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
      <h3 className="text-xl font-bold mb-4">{propertyName}</h3>

      {/* Booking Period Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Booking Period</label>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setBookingPeriod("daily");
              setDuration(1);
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              bookingPeriod === "daily"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => {
              setBookingPeriod("monthly");
              setDuration(1);
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              bookingPeriod === "monthly"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Duration Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          {bookingPeriod === "daily" ? "Number of Days" : "Number of Months"}
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDuration(Math.max(1, duration - 1))}
            className="px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 font-bold"
          >
            −
          </button>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            className="text-center"
          />
          <button
            onClick={() => setDuration(duration + 1)}
            className="px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mb-6 p-4 bg-background rounded-lg border border-border">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {bookingPeriod === "daily"
                ? `₹${pricing.pricePerDay}/day`
                : `₹${pricing.pricePerMonth}/month`}
            </span>
            <span className="font-medium">×{duration}</span>
          </div>
          {pricing.breakdown.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-3 flex justify-between items-center">
          <span className="font-semibold">Total Price:</span>
          <span className="text-2xl font-bold text-primary">
            {formatPrice(pricing.totalPrice)}
          </span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
        <p className="font-medium mb-1">💡 Pricing Information</p>
        <p>
          {bookingPeriod === "daily"
            ? `Daily rate: ₹${pricing.pricePerDay} (calculated as ₹${pricing.pricePerMonth}/month ÷ 30 days)`
            : `Monthly rate: ₹${pricing.pricePerMonth} (fixed monthly rent)`}
        </p>
      </div>

      {/* Book Button */}
      <Button onClick={handleBook} size="lg" className="w-full rounded-lg">
        <Calendar className="w-4 h-4 mr-2" />
        Book Now
      </Button>

      {/* Security Note */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        🔒 Your booking is secure and protected
      </p>
    </Card>
  );
}
