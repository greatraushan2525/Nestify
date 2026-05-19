import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

/**
 * Property Management Page - For Landlords/Hosts
 * Features: List, add, edit, delete properties
 * Design: Warm Hospitality
 */

interface PropertyForm {
  name: string;
  location: string;
  city: string;
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
  const { user } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<PropertyForm>({
    name: "",
    location: "",
    city: "Jaipur",
    price: "",
    type: "boys",
    description: "",
    rooms: "",
    bathrooms: "",
    food: false,
    ac: false,
    wifi: true,
    parking: false,
    laundry: false,
    studyRoom: false,
    commonArea: false,
  });

  useEffect(() => {
    if (user) {
      fetchProperties();
    }
  }, [user]);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/properties/landlord/${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      toast.error("Failed to load your properties");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProperty = async () => {
    if (!formData.name || !formData.location || !formData.price || !formData.city) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const url = editingId ? `/api/properties/${editingId}` : "/api/properties";
      const method = editingId ? "PUT" : "POST"; // Note: Server might need PUT route, checking...
      
      // For now, only POST is implemented on server. Let's stick to adding.
      if (editingId) {
        toast.info("Edit functionality coming soon to API");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price),
          rooms: parseInt(formData.rooms) || 0,
          bathrooms: parseInt(formData.bathrooms) || 0,
          landlordId: user?.id,
        }),
      });

      if (response.ok) {
        toast.success(editingId ? "Property updated!" : "Property added successfully!");
        fetchProperties();
        resetForm();
      } else {
        const error = await response.json();
        toast.error(error.error || "Operation failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      city: "Jaipur",
      price: "",
      type: "boys",
      description: "",
      rooms: "",
      bathrooms: "",
      food: false,
      ac: false,
      wifi: true,
      parking: false,
      laundry: false,
      studyRoom: false,
      commonArea: false,
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleEdit = (property: any) => {
    setFormData({
      name: property.name,
      location: property.location,
      city: property.city || "Jaipur",
      price: property.price.toString(),
      type: property.type,
      description: property.description || "",
      rooms: property.rooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      food: property.food || false,
      ac: property.ac || false,
      wifi: property.wifi || false,
      parking: property.parking || false,
      laundry: property.laundry || false,
      studyRoom: property.studyRoom || false,
      commonArea: property.commonArea || false,
    });
    setEditingId(property._id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    
    try {
      const response = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Property deleted");
        setProperties(properties.filter((p) => p._id !== id));
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              My Properties
            </h1>
            <p className="text-muted-foreground">Manage your listed PGs and hostels</p>
          </div>
          <Button
            className="rounded-full bg-primary hover:bg-primary/90"
            onClick={() => {
              if (showAddForm) resetForm();
              else setShowAddForm(true);
            }}
          >
            {showAddForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {showAddForm ? "Cancel" : "Add Property"}
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="p-6 rounded-2xl mb-8 shadow-lg border-primary/10">
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  City *
                </label>
                <Input
                  placeholder="e.g., Jaipur"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="rounded-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Area/Location *
                </label>
                <Input
                  placeholder="e.g., Malviya Nagar"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Rooms
                  </label>
                  <Input
                    type="number"
                    placeholder="8"
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Bathrooms
                  </label>
                  <Input
                    type="number"
                    placeholder="4"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Description
              </label>
              <Textarea
                placeholder="Describe your property, rules, and surroundings..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="rounded-xl"
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
                  <label key={amenity.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[amenity.key as keyof PropertyForm] as boolean}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [amenity.key]: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 rounded-full bg-primary hover:bg-primary/90"
                onClick={handleAddProperty}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingId ? "Update Property" : "List Property"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-full"
                onClick={resetForm}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property._id} className="p-6 rounded-2xl hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-xl font-bold text-foreground">
                  {property.name}
                </h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                  property.type === 'boys' ? 'bg-blue-100 text-blue-700' : 
                  property.type === 'girls' ? 'bg-pink-100 text-pink-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {property.type}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{property.location}, {property.city}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/30 p-2 rounded-lg">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Price</p>
                  <p className="font-bold text-foreground">₹{property.price}</p>
                </div>
                <div className="bg-muted/30 p-2 rounded-lg">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Rating</p>
                  <p className="font-bold text-foreground">{property.rating || "New"}</p>
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
                  className="flex-1 rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                  onClick={() => handleDelete(property._id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {properties.length === 0 && !showAddForm && (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No properties listed yet</h3>
            <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
              Start earning by listing your PG or hostel on Nestify. It only takes a few minutes!
            </p>
            <Button
              className="rounded-full bg-primary hover:bg-primary/90 px-8"
              onClick={() => setShowAddForm(true)}
            >
              List Your First Property
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
