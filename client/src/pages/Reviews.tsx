import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Trash2 } from "lucide-react";
import { useState } from "react";

/**
 * Reviews Page - Write and view reviews
 * Design: Warm Hospitality
 */

interface Review {
  id: number;
  property: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  isOwn: boolean;
}

export default function Reviews() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("sunrise-pg");

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      property: "Sunrise PG",
      author: "Amit Kumar",
      rating: 5,
      text: "Excellent place with great amenities and friendly landlord! The rooms are spacious and clean. Highly recommended!",
      date: "2026-03-20",
      isOwn: false,
    },
    {
      id: 2,
      property: "Green Valley",
      author: "Neha Singh",
      rating: 4,
      text: "Good location and decent rooms. WiFi could be better. Overall, a nice place to stay.",
      date: "2026-03-18",
      isOwn: false,
    },
    {
      id: 3,
      property: "Cozy Corner PG",
      author: "You",
      rating: 5,
      text: "Amazing experience! The landlord was very cooperative and the facilities are top-notch.",
      date: "2026-03-15",
      isOwn: true,
    },
  ]);

  const properties = [
    { id: "sunrise-pg", name: "Sunrise PG" },
    { id: "green-valley", name: "Green Valley" },
    { id: "cozy-corner", name: "Cozy Corner PG" },
  ];

  const handleSubmitReview = () => {
    if (rating === 0 || !reviewText.trim()) {
      alert("Please provide a rating and review text");
      return;
    }

    const property = properties.find((p) => p.id === selectedProperty);
    const newReview: Review = {
      id: Math.max(...reviews.map((r) => r.id), 0) + 1,
      property: property?.name || "Unknown Property",
      author: "You",
      rating: rating,
      text: reviewText,
      date: new Date().toISOString().split("T")[0],
      isOwn: true,
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setReviewText("");
  };

  const handleDeleteReview = (id: number) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          Reviews
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Write Review */}
          <div className="lg:col-span-1">
            <Card className="p-6 rounded-2xl sticky top-8">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                Write a Review
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Property
                </label>
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full px-4 py-2 rounded-full border border-border bg-background text-foreground"
                >
                  {properties.map((prop) => (
                    <option key={prop.id} value={prop.id}>
                      {prop.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-2xl transition-colors"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {rating} out of 5 stars
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Your Review
                </label>
                <Textarea
                  placeholder="Share your experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="rounded-lg"
                  rows={4}
                />
              </div>

              <Button
                className="w-full rounded-full bg-primary hover:bg-primary/90"
                onClick={handleSubmitReview}
              >
                Submit Review
              </Button>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review.id} className="p-6 rounded-2xl">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {review.property}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          by {review.author}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                        {review.isOwn && (
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-1 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {review.rating}.0
                      </span>
                    </div>

                    <p className="text-foreground">{review.text}</p>

                    {review.isOwn && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          This is your review
                        </p>
                      </div>
                    )}
                  </Card>
                ))
              ) : (
                <Card className="p-8 rounded-2xl text-center">
                  <p className="text-muted-foreground">
                    No reviews yet. Be the first to review!
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
