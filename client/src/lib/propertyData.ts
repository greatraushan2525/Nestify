/**
 * Property Data Service - Expanded with 10-15 Indian Cities and 100+ Properties
 * Manages all property-related data and operations
 * In production, this would connect to a backend API
 */

export interface Property {
  id: number;
  name: string;
  location: string;
  city: string;
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

// City list
export const CITIES = [
  "Jaipur",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Mumbai",
  "Pune",
  "Hyderabad",
  "Kolkata",
  "Ahmedabad",
  "Lucknow",
  "Chandigarh",
  "Indore",
  "Surat",
  "Coimbatore",
  "Bhopal",
];

// Image URLs for different property types
const PROPERTY_IMAGES = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/pg-sunrise-1-iYYRP9eriAN34rC92Qw7UR.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/pg-green-valley-1-7fFHisRX8apqHrUeJjEWQf.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/pg-cozy-corner-1-B4ojrtmXP7hE9sb9DRVPhK.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/pg-modern-living-1-9AQQVbPPb2dJ9Q96wtZ2oz.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/pg-student-haven-1-Mx6uVNrna9HXZzEJ5RViiK.webp",
];

// Property name templates
const PG_NAMES = [
  "Sunrise PG",
  "Green Valley",
  "Cozy Corner",
  "Modern Living",
  "Student Haven",
  "Premium Nest",
  "Royal Residency",
  "Urban Home",
  "Smart Stay",
  "Comfort Zone",
  "Elite Quarters",
  "Home Sweet Home",
  "Nest Abode",
  "Living Space",
  "Happy Home",
];

// Landlord names
const LANDLORD_NAMES = [
  "Rajesh Kumar",
  "Priya Singh",
  "Anjali Sharma",
  "Vikram Patel",
  "Suresh Reddy",
  "Meera Nair",
  "Arjun Verma",
  "Neha Gupta",
  "Amit Kumar",
  "Deepak Singh",
  "Ravi Shankar",
  "Pooja Desai",
  "Sandeep Yadav",
  "Kavya Iyer",
  "Nikhil Joshi",
];

// Generate mock properties for a city
const generatePropertiesForCity = (city: string, startId: number): Property[] => {
  const properties: Property[] = [];
  const priceRange = {
    Jaipur: [3500, 5500],
    Delhi: [5000, 8000],
    Bangalore: [5500, 9000],
    Chennai: [3500, 6000],
    Mumbai: [6000, 10000],
    Pune: [4000, 7000],
    Hyderabad: [3500, 6500],
    Kolkata: [3000, 5000],
    Ahmedabad: [3000, 5500],
    Lucknow: [2500, 4500],
    Chandigarh: [3500, 6000],
    Indore: [2500, 4500],
    Surat: [3000, 5000],
    Coimbatore: [3000, 5500],
    Bhopal: [2500, 4500],
  };

  const [minPrice, maxPrice] = priceRange[city as keyof typeof priceRange] || [3500, 6000];

  for (let i = 0; i < 12; i++) {
    const pgIndex = i % PG_NAMES.length;
    const landlordIndex = i % LANDLORD_NAMES.length;
    const imageIndex = i % PROPERTY_IMAGES.length;
    const type = ["boys", "girls", "co-ed"][i % 3] as "boys" | "girls" | "co-ed";

    const price = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;

    properties.push({
      id: startId + i,
      name: `${PG_NAMES[pgIndex]} ${city}`,
      location: `${city} - ${["North", "South", "East", "West", "Central"][i % 5]} Area`,
      city: city,
      price: price,
      type: type,
      food: Math.random() > 0.3,
      ac: Math.random() > 0.4,
      wifi: Math.random() > 0.1,
      image: PROPERTY_IMAGES[imageIndex],
      rating: (Math.random() * 2 + 3.5).toFixed(1) as unknown as number,
      reviews: Math.floor(Math.random() * 50) + 10,
      description: `A comfortable and welcoming PG in ${city} with modern amenities and friendly atmosphere. Perfect for students and working professionals.`,
      amenities: [
        Math.random() > 0.3 ? "Food Included" : null,
        Math.random() > 0.4 ? "AC" : null,
        "WiFi",
        Math.random() > 0.5 ? "Parking" : null,
        "Laundry",
        Math.random() > 0.4 ? "Study Room" : null,
        "Common Area",
      ].filter(Boolean) as string[],
      landlord: {
        id: landlordIndex,
        name: LANDLORD_NAMES[landlordIndex],
        phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `${LANDLORD_NAMES[landlordIndex].toLowerCase().replace(" ", "")}@nestify.com`,
        verified: true,
        rating: (Math.random() * 1 + 4).toFixed(1) as unknown as number,
      },
      images: [PROPERTY_IMAGES[imageIndex]],
      rooms: Math.floor(Math.random() * 8) + 4,
      bathrooms: Math.floor(Math.random() * 4) + 2,
      parking: Math.random() > 0.5,
      laundry: true,
      studyRoom: Math.random() > 0.3,
      commonArea: true,
    });
  }

  return properties;
};

// Generate all properties for all cities
const generateAllProperties = (): Property[] => {
  let allProperties: Property[] = [];
  let currentId = 1;

  for (const city of CITIES) {
    const cityProperties = generatePropertiesForCity(city, currentId);
    allProperties = [...allProperties, ...cityProperties];
    currentId += cityProperties.length;
  }

  return allProperties;
};

// Mock property data - 12 properties per city × 15 cities = 180 properties
export const PROPERTIES: Property[] = generateAllProperties();

export function getPropertyById(id: number): Property | undefined {
  return PROPERTIES.find((p) => p.id === id);
}

export function searchProperties(query: string): Property[] {
  return PROPERTIES.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase()) ||
      p.city.toLowerCase().includes(query.toLowerCase())
  );
}

export function filterProperties(
  city?: string,
  location?: string,
  priceRange?: "low" | "mid" | "high",
  type?: "boys" | "girls" | "co-ed"
): Property[] {
  return PROPERTIES.filter((p) => {
    if (city && p.city !== city) {
      return false;
    }

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

export function getPropertiesByCity(city: string): Property[] {
  return PROPERTIES.filter((p) => p.city === city);
}
