/**
 * Property Data Service
 * Manages all property-related data and operations
 * In production, this would connect to a backend API
 */

export interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  type: "boys" | "girls" | "co-ed";
  food: boolean;
  ac: boolean;
  wifi: boolean;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  amenities: string[];
  landlord: {
    id: number;
    name: string;
    phone: string;
    email: string;
    verified: boolean;
    rating: number;
  };
  images: string[];
  rooms: number;
  bathrooms: number;
  parking: boolean;
  laundry: boolean;
  studyRoom: boolean;
  commonArea: boolean;
}

// Mock property data
export const PROPERTIES: Property[] = [
  {
    id: 1,
    name: "Sunrise PG",
    location: "Jaipur",
    price: 4000,
    type: "boys",
    food: true,
    ac: true,
    wifi: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-property-bg-MypPbgT6S6Y4WWu5X8Nsnd.webp",
    rating: 4.5,
    reviews: 28,
    description: "A comfortable and welcoming PG with modern amenities and friendly atmosphere.",
    amenities: ["Food Included", "AC", "WiFi", "Laundry", "Study Room"],
    landlord: {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91-9876543210",
      email: "rajesh@nestify.com",
      verified: true,
      rating: 4.6,
    },
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-property-bg-MypPbgT6S6Y4WWu5X8Nsnd.webp",
    ],
    rooms: 8,
    bathrooms: 4,
    parking: true,
    laundry: true,
    studyRoom: true,
    commonArea: true,
  },
  {
    id: 2,
    name: "Green Valley Hostel",
    location: "Delhi",
    price: 5500,
    type: "co-ed",
    food: true,
    ac: false,
    wifi: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-property-bg-KinyaqCriJdqNHzg5uRjtj.webp",
    rating: 4.2,
    reviews: 15,
    description: "Budget-friendly hostel with great community vibes and excellent location.",
    amenities: ["Food Included", "WiFi", "Common Area", "Laundry"],
    landlord: {
      id: 2,
      name: "Priya Singh",
      phone: "+91-8765432109",
      email: "priya@nestify.com",
      verified: true,
      rating: 4.3,
    },
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-property-bg-KinyaqCriJdqNHzg5uRjtj.webp",
    ],
    rooms: 12,
    bathrooms: 6,
    parking: false,
    laundry: true,
    studyRoom: true,
    commonArea: true,
  },
  {
    id: 3,
    name: "Cozy Corner PG",
    location: "Bangalore",
    price: 6000,
    type: "girls",
    food: true,
    ac: true,
    wifi: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-testimonial-bg-UBv8BmaTYhGoPi9DHggnGg.webp",
    rating: 4.8,
    reviews: 42,
    description: "Premium PG for girls with top-notch security and luxurious amenities.",
    amenities: ["Food Included", "AC", "WiFi", "Parking", "Laundry", "Study Room", "Common Area"],
    landlord: {
      id: 3,
      name: "Anjali Sharma",
      phone: "+91-7654321098",
      email: "anjali@nestify.com",
      verified: true,
      rating: 4.9,
    },
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-testimonial-bg-UBv8BmaTYhGoPi9DHggnGg.webp",
    ],
    rooms: 10,
    bathrooms: 5,
    parking: true,
    laundry: true,
    studyRoom: true,
    commonArea: true,
  },
  {
    id: 4,
    name: "Modern Living",
    location: "Mumbai",
    price: 8000,
    type: "co-ed",
    food: false,
    ac: true,
    wifi: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-feature-icon-bg-6LrRxUPjGaq4tJry5V6eDi.webp",
    rating: 4.6,
    reviews: 35,
    description: "Modern apartment-style living with premium facilities and great connectivity.",
    amenities: ["AC", "WiFi", "Parking", "Laundry", "Common Area"],
    landlord: {
      id: 4,
      name: "Vikram Patel",
      phone: "+91-6543210987",
      email: "vikram@nestify.com",
      verified: true,
      rating: 4.7,
    },
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-feature-icon-bg-6LrRxUPjGaq4tJry5V6eDi.webp",
    ],
    rooms: 6,
    bathrooms: 3,
    parking: true,
    laundry: true,
    studyRoom: false,
    commonArea: true,
  },
  {
    id: 5,
    name: "Student Haven",
    location: "Pune",
    price: 4500,
    type: "boys",
    food: true,
    ac: false,
    wifi: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-dashboard-bg-3MAnfLAKSznF9jfKLkMihj.webp",
    rating: 4.3,
    reviews: 22,
    description: "Affordable PG perfect for students with study-friendly environment.",
    amenities: ["Food Included", "WiFi", "Study Room", "Common Area"],
    landlord: {
      id: 5,
      name: "Suresh Reddy",
      phone: "+91-5432109876",
      email: "suresh@nestify.com",
      verified: true,
      rating: 4.4,
    },
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-dashboard-bg-3MAnfLAKSznF9jfKLkMihj.webp",
    ],
    rooms: 9,
    bathrooms: 4,
    parking: false,
    laundry: true,
    studyRoom: true,
    commonArea: true,
  },
  {
    id: 6,
    name: "Premium Nest",
    location: "Hyderabad",
    price: 7500,
    type: "girls",
    food: true,
    ac: true,
    wifi: true,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-hero-MypPbgT6S6Y4WWu5X8Nsnd.webp",
    rating: 4.7,
    reviews: 38,
    description: "Luxury PG for girls with premium security and world-class amenities.",
    amenities: ["Food Included", "AC", "WiFi", "Parking", "Laundry", "Study Room", "Common Area"],
    landlord: {
      id: 6,
      name: "Meera Nair",
      phone: "+91-4321098765",
      email: "meera@nestify.com",
      verified: true,
      rating: 4.8,
    },
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-hero-MypPbgT6S6Y4WWu5X8Nsnd.webp",
    ],
    rooms: 8,
    bathrooms: 4,
    parking: true,
    laundry: true,
    studyRoom: true,
    commonArea: true,
  },
];

export function getPropertyById(id: number): Property | undefined {
  return PROPERTIES.find((p) => p.id === id);
}

export function searchProperties(query: string): Property[] {
  return PROPERTIES.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase())
  );
}

export function filterProperties(
  location?: string,
  priceRange?: "low" | "mid" | "high",
  type?: "boys" | "girls" | "co-ed"
): Property[] {
  return PROPERTIES.filter((p) => {
    if (location && !p.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }

    if (priceRange) {
      if (priceRange === "low" && p.price >= 5000) return false;
      if (priceRange === "mid" && (p.price < 5000 || p.price > 7000)) return false;
      if (priceRange === "high" && p.price <= 7000) return false;
    }

    if (type && p.type !== type) {
      return false;
    }

    return true;
  });
}
