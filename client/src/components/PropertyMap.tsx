import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { AlertCircle, MapPin } from "lucide-react";

interface Property {
  id: number;
  name: string;
  location: string;
  city: string;
  price: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId?: number;
  onPropertySelect?: (propertyId: number) => void;
  zoom?: number;
  center?: { lat: number; lng: number };
}

// Default coordinates for major Indian cities
const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Delhi: { lat: 28.7041, lng: 77.1025 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Hyderabad: { lat: 17.3850, lng: 78.4867 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714 },
  Lucknow: { lat: 26.8467, lng: 80.9462 },
  Chandigarh: { lat: 30.7333, lng: 76.7794 },
  Indore: { lat: 22.7196, lng: 75.8577 },
  Surat: { lat: 21.1458, lng: 72.8336 },
  Coimbatore: { lat: 11.0081, lng: 76.9124 },
  Bhopal: { lat: 23.1815, lng: 79.9864 },
};

export default function PropertyMap({
  properties,
  selectedPropertyId,
  onPropertySelect,
  zoom = 13,
  center,
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // Check if Google Maps API is loaded
    if (!window.google || !window.google.maps) {
      setError("Google Maps API not loaded. Please add your API key to .env");
      return;
    }

    // Determine center based on properties or provided center
    let mapCenter = center;
    if (!mapCenter && properties.length > 0) {
      const firstProperty = properties[0];
      if (firstProperty.coordinates) {
        mapCenter = {
          lat: firstProperty.coordinates.latitude,
          lng: firstProperty.coordinates.longitude,
        };
      } else if (firstProperty.city) {
        mapCenter = CITY_COORDINATES[firstProperty.city];
      }
    }

    if (!mapCenter) {
      mapCenter = CITY_COORDINATES["Delhi"]; // Default to Delhi
    }

    const newMap = new google.maps.Map(mapRef.current, {
      zoom,
      center: mapCenter,
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: false,
    });

    setMap(newMap);
  }, [zoom, center, properties.length]);

  // Add markers for properties
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null));

    const newMarkers: google.maps.Marker[] = [];

    properties.forEach((property) => {
      let coordinates = property.coordinates;

      // Use city coordinates if property coordinates not available
      if (!coordinates && property.city) {
        const cityCoords = CITY_COORDINATES[property.city];
        if (cityCoords) {
          coordinates = {
            latitude: cityCoords.lat,
            longitude: cityCoords.lng,
          };
        }
      }

      if (!coordinates) return;

      const marker = new google.maps.Marker({
        position: {
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        },
        map,
        title: property.name,
        icon:
          selectedPropertyId === property.id
            ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      });

      // Info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold text-sm">${property.name}</h3>
            <p class="text-xs text-gray-600">${property.location}, ${property.city}</p>
            <p class="text-sm font-bold text-primary mt-1">₹${property.price}/month</p>
          </div>
        `,
      });

      marker.addListener("click", () => {
        // Close all other info windows
        infoWindow.open(map, marker);
        onPropertySelect?.(property.id);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    // Auto-fit bounds if multiple properties
    if (newMarkers.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach((marker) => {
        bounds.extend(marker.getPosition()!);
      });
      map.fitBounds(bounds);
    }
  }, [map, properties, selectedPropertyId, onPropertySelect]);

  if (error) {
    return (
      <Card className="p-6 border-yellow-200 bg-yellow-50">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900">Map Configuration Required</h3>
            <p className="text-sm text-yellow-700 mt-1">{error}</p>
            <p className="text-sm text-yellow-700 mt-2">
              To enable Google Maps, add your API key to the <code className="bg-yellow-100 px-1 rounded">.env</code> file:
            </p>
            <code className="block bg-yellow-100 p-2 rounded mt-2 text-xs">
              GOOGLE_MAPS_API_KEY=your_api_key_here
            </code>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <MapPin className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Property Locations</h2>
      </div>

      <Card className="overflow-hidden">
        <div
          ref={mapRef}
          className="w-full h-96 rounded-lg"
          style={{ minHeight: "400px" }}
        />
      </Card>

      <div className="text-xs text-muted-foreground">
        <p>📍 Click on markers to view property details</p>
        <p>🔵 Blue markers: Available properties | 🔴 Red markers: Selected property</p>
      </div>
    </div>
  );
}
