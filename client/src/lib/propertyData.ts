/**
 * Property Data Service - Expanded with City Locations, College Proximity & Metro Distances
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
  nearCollege?: {
    name: string;
    distance: string; // e.g., "2.5 km"
  };
  nearMetro?: {
    name: string;
    distance: string;
  };
}

export interface College {
  id: number;
  name: string;
  city: string;
  type: string; // "University" | "Engineering" | "Medical" | "Arts & Science"
  properties: number[]; // Property IDs near this college
}

// City list with locations
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

// City locations mapping
export const CITY_LOCATIONS: Record<string, string[]> = {
  Jaipur: [
    "Vidhani",
    "Goner",
    "Malviya Nagar",
    "Bani Park",
    "C-Scheme",
    "Adarsh Nagar",
    "Tonk Road",
    "Jhotwara",
    "Mansarovar",
    "Sanganer",
  ],
  Delhi: [
    "Dwarka",
    "Rohini",
    "Noida",
    "Gurgaon",
    "South Delhi",
    "North Delhi",
    "East Delhi",
    "West Delhi",
    "Central Delhi",
    "Outer Delhi",
  ],
  Bangalore: [
    "Whitefield",
    "Indiranagar",
    "Koramangala",
    "Marathahalli",
    "Bellandur",
    "Banashankari",
    "Jayanagar",
    "Vijayanagar",
    "Yeshwanthpur",
    "Ramamurthy Nagar",
  ],
  Chennai: [
    "Velachery",
    "Tambaram",
    "Adyar",
    "Besant Nagar",
    "Mylapore",
    "Nungambakkam",
    "Egmore",
    "Kilpauk",
    "Chetpet",
    "Teynampet",
  ],
  Mumbai: [
    "Andheri",
    "Bandra",
    "Dadar",
    "Mahim",
    "Powai",
    "Vile Parle",
    "Borivali",
    "Thane",
    "Navi Mumbai",
    "Mulund",
  ],
  Pune: [
    "Hinjewadi",
    "Wakad",
    "Baner",
    "Pashan",
    "Kalyani Nagar",
    "Viman Nagar",
    "Kothrud",
    "Hadapsar",
    "Magarpatta",
    "Pimpri",
  ],
  Hyderabad: [
    "Hitech City",
    "Gachibowli",
    "Jubilee Hills",
    "Banjara Hills",
    "Kondapur",
    "Madhapur",
    "Kukatpally",
    "Secunderabad",
    "Begumpet",
    "Panjagutta",
  ],
  Kolkata: [
    "Saltlake",
    "Newtown",
    "Ballygunge",
    "Alipore",
    "Behala",
    "Howrah",
    "Barrackpore",
    "Dakshineswar",
    "Dum Dum",
    "Kalighat",
  ],
  Ahmedabad: [
    "Thaltej",
    "Iscon",
    "Vastrapur",
    "Bodakdev",
    "Satellite",
    "Memnagar",
    "Rajpur",
    "Navrangpura",
    "Ambawadi",
    "Paldi",
  ],
  Lucknow: [
    "Gomti Nagar",
    "Indira Nagar",
    "Aliganj",
    "Charbagh",
    "Hazratganj",
    "Alambagh",
    "Dilkusha",
    "Mahanagar",
    "Vibhuti Khand",
    "Saket",
  ],
  Chandigarh: [
    "Sector 17",
    "Sector 35",
    "Sector 22",
    "Sector 9",
    "Sector 7",
    "Sector 26",
    "Sector 15",
    "Sector 12",
    "Sector 20",
    "Sector 8",
  ],
  Indore: [
    "Vijay Nagar",
    "Rau",
    "Khajrana",
    "Sudama Nagar",
    "Rajwada",
    "Palasia",
    "Sapna Sangeeta",
    "Bhanwar Kuwa",
    "Choti Gwaltoli",
    "Mhow",
  ],
  Surat: [
    "Vesu",
    "Adajan",
    "Magdalla Park",
    "Athwa",
    "Katargam",
    "Urvashi",
    "Pal",
    "Dumas Road",
    "Piplod",
    "Varachha",
  ],
  Coimbatore: [
    "Gandhipuram",
    "Peelamedu",
    "Saibaba Colony",
    "Ramanathapuram",
    "Kuniyamuthur",
    "Avinashi Road",
    "Sowripalayam",
    "Ukkadam",
    "Singanallur",
    "Koundampalayam",
  ],
  Bhopal: [
    "Arera Colony",
    "Hoshangabad Road",
    "Indore Road",
    "Berasia Road",
    "Raisen Road",
    "Kolar Road",
    "Habibganj",
    "New Market",
    "Shyamala Hills",
    "Piplani",
  ],
};

// Colleges and Universities
export const COLLEGES: College[] = [
  {
    id: 1,
    name: "Rajasthan University",
    city: "Jaipur",
    type: "University",
    properties: [],
  },
  {
    id: 2,
    name: "Manipal University Jaipur",
    city: "Jaipur",
    type: "Engineering",
    properties: [],
  },
  {
    id: 3,
    name: "Delhi University",
    city: "Delhi",
    type: "University",
    properties: [],
  },
  {
    id: 4,
    name: "IIT Delhi",
    city: "Delhi",
    type: "Engineering",
    properties: [],
  },
  {
    id: 5,
    name: "Bangalore University",
    city: "Bangalore",
    type: "University",
    properties: [],
  },
  {
    id: 6,
    name: "IIT Bangalore",
    city: "Bangalore",
    type: "Engineering",
    properties: [],
  },
  {
    id: 7,
    name: "Anna University",
    city: "Chennai",
    type: "University",
    properties: [],
  },
  {
    id: 8,
    name: "IIT Madras",
    city: "Chennai",
    type: "Engineering",
    properties: [],
  },
  {
    id: 9,
    name: "University of Mumbai",
    city: "Mumbai",
    type: "University",
    properties: [],
  },
  {
    id: 10,
    name: "IIT Bombay",
    city: "Mumbai",
    type: "Engineering",
    properties: [],
  },
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
  "Kavya Nair",
  "Rohit Sharma",
];

// Amenities
const AMENITIES_LIST = [
  "WiFi",
  "AC",
  "Laundry",
  "Study Room",
  "Common Area",
  "Kitchen",
  "Parking",
  "CCTV",
  "24/7 Security",
  "Gym",
  "Balcony",
  "Hot Water",
];

// Metro stations for proximity
const METRO_STATIONS: Record<string, string[]> = {
  Delhi: [
    "Dwarka Mor",
    "Rajiv Chowk",
    "Noida City Center",
    "Gurgaon",
    "Chandni Chowk",
  ],
  Bangalore: ["Whitefield", "Indiranagar", "Koramangala", "Bellandur"],
  Chennai: ["Alandur", "Thirumangalam", "Koyambedu"],
  Mumbai: ["Andheri", "Bandra", "Dadar", "Powai"],
  Pune: ["Hinjewadi", "Wakad", "Viman Nagar"],
  Hyderabad: ["Hitech City", "Gachibowli", "Jubilee Hills"],
};

// Generate properties with college/metro proximity
export function generateProperties(): Property[] {
  const properties: Property[] = [];
  let id = 1;

  CITIES.forEach((city, cityIndex) => {
    const locations = CITY_LOCATIONS[city] || [];
    const metroStations = METRO_STATIONS[city] || [];
    const collegesInCity = COLLEGES.filter((c) => c.city === city);

    locations.forEach((location, locIndex) => {
      for (let i = 0; i < 12; i++) {
        const pgName = PG_NAMES[i % PG_NAMES.length];
        const landlord = LANDLORD_NAMES[i % LANDLORD_NAMES.length];
        const amenities = AMENITIES_LIST.slice(0, 5 + (i % 4));

        // Calculate proximity
        let nearCollege = undefined;
        let nearMetro = undefined;

        if (collegesInCity.length > 0) {
          const college = collegesInCity[i % collegesInCity.length];
          const distances = ["1.2 km", "2.5 km", "3.8 km", "4.5 km", "5.2 km"];
          nearCollege = {
            name: college.name,
            distance: distances[i % distances.length],
          };
        }

        if (metroStations.length > 0) {
          const metro = metroStations[i % metroStations.length];
          const distances = ["0.8 km", "1.5 km", "2.2 km", "3.0 km", "4.5 km"];
          nearMetro = {
            name: metro,
            distance: distances[i % distances.length],
          };
        }

        const propertyObj: Property = {
          id: id++,
          name: `${pgName} ${location}`,
          location: location,
          city: city,
          price: 3500 + (cityIndex * 500 + locIndex * 100 + i * 50) % 5000,
          type: ["boys", "girls", "co-ed"][i % 3] as "boys" | "girls" | "co-ed",
          food: i % 2 === 0,
          ac: i % 3 !== 0,
          wifi: true,
          image: PROPERTY_IMAGES[i % PROPERTY_IMAGES.length],
          rating: 3.5 + ((i * 7) % 15) / 10,
          reviews: 10 + (i % 50),
          description: `Comfortable co-ed PG in ${location}, ${city}. Well-maintained rooms with all modern amenities.`,
          amenities: amenities,
          landlord: {
            id: i,
            name: landlord,
            phone: `+91 ${9000000000 + id}`,
            email: `landlord${id}@nestify.com`,
            verified: i % 2 === 0,
            rating: 4.0 + ((i * 3) % 10) / 10,
          },
          images: [PROPERTY_IMAGES[i % PROPERTY_IMAGES.length]],
          rooms: 1 + (i % 4),
          bathrooms: 1 + (i % 2),
          parking: i % 3 === 0,
          laundry: i % 2 === 0,
          studyRoom: i % 2 === 0,
          commonArea: true,
          nearCollege: nearCollege,
          nearMetro: nearMetro,
        };

        properties.push(propertyObj);
      }
    });
  });

  return properties;
}

// Property database
const PROPERTIES = generateProperties();

export function getAllProperties(): Property[] {
  return PROPERTIES;
}

export function getPropertyById(id: number): Property | undefined {
  return PROPERTIES.find((p) => p.id === id);
}

export function getPropertiesByCity(city: string): Property[] {
  return PROPERTIES.filter((p) => p.city === city);
}

export function getPropertiesByLocation(location: string): Property[] {
  return PROPERTIES.filter((p) => p.location === location);
}

export function getPropertiesByType(type: string): Property[] {
  return PROPERTIES.filter((p) => p.type === type);
}

export function getPropertiesByPriceRange(min: number, max: number): Property[] {
  return PROPERTIES.filter((p) => p.price >= min && p.price <= max);
}

export function searchProperties(query: string): Property[] {
  const lowerQuery = query.toLowerCase();
  return PROPERTIES.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.location.toLowerCase().includes(lowerQuery) ||
      p.city.toLowerCase().includes(lowerQuery)
  );
}

// Get properties near colleges
export function getPropertiesNearColleges(city: string): Property[] {
  return PROPERTIES.filter((p) => p.city === city && p.nearCollege);
}

// Get properties near metros
export function getPropertiesNearMetros(city: string): Property[] {
  return PROPERTIES.filter((p) => p.city === city && p.nearMetro);
}
