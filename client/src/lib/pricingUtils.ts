/**
 * Pricing Utilities
 * Handles rent calculations for different booking periods
 */

export type BookingPeriod = "daily" | "monthly";

export interface PricingDetails {
  pricePerMonth: number;
  pricePerDay: number;
  bookingPeriod: BookingPeriod;
  numberOfDays: number;
  numberOfMonths: number;
  totalPrice: number;
  breakdown: {
    label: string;
    value: number;
  }[];
}

/**
 * Calculate the total price based on the booking period
 * @param pricePerMonth - Monthly rent price
 * @param bookingPeriod - Type of booking (daily or monthly)
 * @param duration - Number of days or months
 * @returns Pricing details object
 */
export function calculateRent(
  pricePerMonth: number,
  bookingPeriod: BookingPeriod,
  duration: number
): PricingDetails {
  const pricePerDay = Math.round(pricePerMonth / 30); // Average days per month

  let totalPrice = 0;
  let numberOfDays = 0;
  let numberOfMonths = 0;
  const breakdown: { label: string; value: number }[] = [];

  if (bookingPeriod === "daily") {
    numberOfDays = duration;
    totalPrice = pricePerDay * numberOfDays;
    breakdown.push({
      label: `${numberOfDays} days @ ₹${pricePerDay}/day`,
      value: totalPrice,
    });
  } else if (bookingPeriod === "monthly") {
    numberOfMonths = duration;
    totalPrice = pricePerMonth * numberOfMonths;
    numberOfDays = numberOfMonths * 30; // For reference
    breakdown.push({
      label: `${numberOfMonths} month${numberOfMonths > 1 ? "s" : ""} @ ₹${pricePerMonth}/month`,
      value: totalPrice,
    });
  }

  return {
    pricePerMonth,
    pricePerDay,
    bookingPeriod,
    numberOfDays,
    numberOfMonths,
    totalPrice,
    breakdown,
  };
}

/**
 * Format price as Indian currency
 * @param price - Price in rupees
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Get price per day from monthly rent
 * @param pricePerMonth - Monthly rent price
 * @returns Price per day
 */
export function getPricePerDay(pricePerMonth: number): number {
  return Math.round(pricePerMonth / 30);
}

/**
 * Get price per month from daily rent
 * @param pricePerDay - Daily rent price
 * @returns Price per month (30 days)
 */
export function getPricePerMonth(pricePerDay: number): number {
  return pricePerDay * 30;
}

/**
 * Calculate discount
 * @param originalPrice - Original price
 * @param discountPercentage - Discount percentage
 * @returns Discounted price
 */
export function applyDiscount(originalPrice: number, discountPercentage: number): number {
  return Math.round(originalPrice * (1 - discountPercentage / 100));
}

/**
 * Calculate GST (18% in India)
 * @param price - Price before GST
 * @param gstPercentage - GST percentage (default 18)
 * @returns Price with GST
 */
export function addGST(price: number, gstPercentage: number = 18): number {
  return Math.round(price * (1 + gstPercentage / 100));
}
