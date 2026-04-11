import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { BookOpen, MessageSquare, Star, Home, LogOut, Settings, Heart } from "lucide-react";

/**
 * Dashboard Page - Compact User Profile and Activity
 * Features: User info, quick stats, quick links, recent activity
 * Design: Minimal spacing, efficient layout
 */

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background py-6">
      <div className="container mx-auto px-4">
        {/* Header with Profile */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-white">J</span>
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">John Doe</h1>
              <p className="text-sm text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-blue-600 font-semibold">Bookings</p>
                <p className="font-display text-xl font-bold text-blue-900">3</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-purple-600 font-semibold">Messages</p>
                <p className="font-display text-xl font-bold text-purple-900">5</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-yellow-600 font-semibold">Reviews</p>
                <p className="font-display text-xl font-bold text-yellow-900">8</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-pink-600 font-semibold">Saved</p>
                <p className="font-display text-xl font-bold text-pink-900">12</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Link href="/bookings">
            <a className="no-underline">
              <Card className="p-4 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer">
                <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-semibold text-sm text-foreground">Bookings</p>
              </Card>
            </a>
          </Link>
          <Link href="/messages">
            <a className="no-underline">
              <Card className="p-4 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer">
                <MessageSquare className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="font-semibold text-sm text-foreground">Messages</p>
              </Card>
            </a>
          </Link>
          <Link href="/reviews">
            <a className="no-underline">
              <Card className="p-4 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer">
                <Star className="w-6 h-6 text-secondary mx-auto mb-2" />
                <p className="font-semibold text-sm text-foreground">Reviews</p>
              </Card>
            </a>
          </Link>
          <Link href="/wishlist">
            <a className="no-underline">
              <Card className="p-4 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer">
                <Heart className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                <p className="font-semibold text-sm text-foreground">Wishlist</p>
              </Card>
            </a>
          </Link>
        </div>

        {/* Recent Activity & Profile Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recent Activity */}
          <Card className="p-4 rounded-xl">
            <h3 className="font-display font-bold text-foreground mb-3 text-sm">Recent Activity</h3>
            <div className="space-y-2">
              {[
                { title: "Booked Sunrise PG", time: "2 hours ago" },
                { title: "Message from Rajesh Kumar", time: "4 hours ago" },
                { title: "Review submitted", time: "1 day ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Profile Settings */}
          <Card className="p-4 rounded-xl">
            <h3 className="font-display font-bold text-foreground mb-3 text-sm">Profile Settings</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full rounded-lg text-sm h-9 justify-start">
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full rounded-lg text-sm h-9 justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full rounded-lg text-sm h-9 justify-start">
                Notification Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
