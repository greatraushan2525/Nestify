import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { BookOpen, MessageSquare, Star, Home } from "lucide-react";

/**
 * Dashboard Page - User Profile and Activity
 * Features: User info, bookings, messages, reviews
 */

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">My Dashboard</h1>

        {/* User Profile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="md:col-span-1 p-6 rounded-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-primary">J</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                John Doe
              </h2>
              <p className="text-muted-foreground mb-4">john@example.com</p>
              <Button variant="outline" className="w-full rounded-full mb-2">
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full rounded-full">
                Change Password
              </Button>
            </div>
          </Card>

          {/* Stats */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <Card className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="flex items-center gap-4">
                <BookOpen className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-muted-foreground text-sm">Active Bookings</p>
                  <p className="font-display text-2xl font-bold text-foreground">3</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-secondary/10">
              <div className="flex items-center gap-4">
                <MessageSquare className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-muted-foreground text-sm">Messages</p>
                  <p className="font-display text-2xl font-bold text-foreground">5</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10">
              <div className="flex items-center gap-4">
                <Star className="w-8 h-8 text-secondary" />
                <div>
                  <p className="text-muted-foreground text-sm">Reviews Given</p>
                  <p className="font-display text-2xl font-bold text-foreground">8</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="flex items-center gap-4">
                <Home className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-muted-foreground text-sm">Saved Properties</p>
                  <p className="font-display text-2xl font-bold text-foreground">12</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link href="/bookings">
            <a className="no-underline">
              <Card className="p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display font-bold text-foreground">My Bookings</h3>
              </Card>
            </a>
          </Link>
          <Link href="/messages">
            <a className="no-underline">
              <Card className="p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                <MessageSquare className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-display font-bold text-foreground">Messages</h3>
              </Card>
            </a>
          </Link>
          <Link href="/reviews">
            <a className="no-underline">
              <Card className="p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                <Star className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-display font-bold text-foreground">Reviews</h3>
              </Card>
            </a>
          </Link>
          <Link href="/my-properties">
            <a className="no-underline">
              <Card className="p-6 rounded-2xl text-center hover:shadow-lg transition-shadow cursor-pointer">
                <Home className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display font-bold text-foreground">My Properties</h3>
              </Card>
            </a>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 rounded-2xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-border last:border-b-0">
                <div>
                  <p className="font-semibold text-foreground">Activity {i}</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <span className="text-sm text-primary">View</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
