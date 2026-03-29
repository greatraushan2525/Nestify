import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { useState } from "react";

/**
 * Property Management Page - For Landlords/Hosts
 * Features: List, add, edit, delete properties
 * Design: Warm Hospitality
 */

interface PropertyForm {
  name: string;
  location: string;
  price: string;
  type: "boys" | "girls" | "co-ed";
  description: string;
  rooms: string;
  bathrooms: string;
  food: boolean;
  ac: boolean;
  wifi: boolean;
  parking: boolean;
  laundry: boolean;
  studyRoom: boolean;
  commonArea: boolean;
}

export default function PropertyManagement() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Sunrise PG",
      location: "Jaipur",
      price: 4000,
      bookings: 5,
      type: "boys",
    },
    {
      id: 2,
      name: "Green Valley",
      location: "Delhi",
      price: 5500,
      bookings: 3,
      type: "co-ed",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<PropertyForm>({
    name: "",
    location: "",
    price: "",
    type: "boys",
    description: "",
    rooms: "",
    bathrooms: "",
    food: false,
    ac: false,
    wifi: false,
    parking: false,
    laundry: false,
    studyRoom: false,
    commonArea: false,
  });

  const handleAddProperty = () => {
    if (!formData.name || !formData.location || !formData.price) {
      alert("Please fill in required fields");
      return;
    }

    if (editingId) {
      setProperties(
        properties.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formData.name,
                location: formData.location,
                price: parseInt(formData.price),
                type: formData.type,
              }
            : p
        )
      );
      setEditingId(null);
    } else {
      setProperties([
        ...properties,
        {
          id: Math.max(...properties.map((p) => p.id), 0) + 1,
          name: formData.name,
          location: formData.location,
          price: parseInt(formData.price),
          bookings: 0,
          type: formData.type,
        },
      ]);
    }

    setFormData({
      name: "",
      location: "",
      price: "",
      type: "boys",
      description: "",
      rooms: "",
      bathrooms: "",
      food: false,
      ac: false,
      wifi: false,
      parking: false,
      laundry: false,
      studyRoom: false,
      commonArea: false,
    });
    setShowAddForm(false);
  };

  const handleEdit = (property: any) => {
    setFormData({
      name: property.name,
      location: property.location,
      price: property.price.toString(),
      type: property.type,
      description: "",
      rooms: "",
      bathrooms: "",
      food: false,
      ac: false,
      wifi: false,
      parking: false,
      laundry: false,
      studyRoom: false,
      commonArea: false,
    });
    setEditingId(property.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            My Properties
          </h1>
          <Button
            className="rounded-full bg-primary hover:bg-primary/90"
            onClick={() => {
              setEditingId(null);
              setShowAddForm(!showAddForm);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            {showAddForm ? "Cancel" : "Add Property"}
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="p-6 rounded-2xl mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              {editingId ? "Edit Property" : "Add New Property"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Property Name *
                </label>
                <Input
                  placeholder="e.g., Sunrise PG"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="rounded-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Location *
                </label>
                <Input
                  placeholder="e.g., Jaipur"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="rounded-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Price (₹/month) *
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 4000"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="rounded-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Property Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "boys" | "girls" | "co-ed",
                    })
                  }
                  className="w-full px-4 py-2 rounded-full border border-border bg-background text-foreground"
                >
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                  <option value="co-ed">Co-ed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Rooms
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 8"
                  value={formData.rooms}
                  onChange={(e) =>
                    setFormData({ ...formData, rooms: e.target.value })
                  }
                  className="rounded-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Bathrooms
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 4"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    setFormData({ ...formData, bathrooms: e.target.value })
                  }
                  className="rounded-full"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Description
              </label>
              <Textarea
                placeholder="Describe your property..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="rounded-lg"
                rows={3}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: "food", label: "Food Included" },
                  { key: "ac", label: "AC" },
                  { key: "wifi", label: "WiFi" },
                  { key: "parking", label: "Parking" },
                  { key: "laundry", label: "Laundry" },
                  { key: "studyRoom", label: "Study Room" },
                  { key: "commonArea", label: "Common Area" },
                ].map((amenity) => (
                  <label key={amenity.key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData[amenity.key as keyof PropertyForm] as boolean}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [amenity.key]: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-foreground">{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 rounded-full bg-primary hover:bg-primary/90"
                onClick={handleAddProperty}
              >
                {editingId ? "Update Property" : "Add Property"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-full"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  setFormData({
                    name: "",
                    location: "",
                    price: "",
                    type: "boys",
                    description: "",
                    rooms: "",
                    bathrooms: "",
                    food: false,
                    ac: false,
                    wifi: false,
                    parking: false,
                    laundry: false,
                    studyRoom: false,
                    commonArea: false,
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="p-6 rounded-2xl">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {property.name}
              </h3>
              <p className="text-muted-foreground mb-4">{property.location}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-bold text-foreground">₹{property.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bookings</p>
                  <p className="font-bold text-foreground">{property.bookings}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-full"
                  onClick={() => handleEdit(property)}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-full text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(property.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {properties.length === 0 && !showAddForm && (
          <Card className="p-8 rounded-2xl text-center">
            <p className="text-muted-foreground mb-4">
              You haven't added any properties yet.
            </p>
            <Button
              className="rounded-full bg-primary hover:bg-primary/90"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Property
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
