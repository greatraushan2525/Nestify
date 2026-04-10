import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import NotificationBell from "./NotificationBell";

/**
 * Header Component - Warm Hospitality Design
 * Features: Logo, navigation menu, user actions
 * Design: Rounded corners, warm coral accent, responsive mobile menu
 */

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 no-underline">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-display text-xl font-bold text-foreground hidden sm:inline">
              Nestify
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/">
            <a className="text-foreground hover:text-primary transition-colors font-body">
              Browse
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="text-foreground hover:text-primary transition-colors font-body">
              Dashboard
            </a>
          </Link>
          <Link href="/my-properties">
            <a className="text-foreground hover:text-primary transition-colors font-body">
              My Properties
            </a>
          </Link>
          <Link href="/messages">
            <a className="text-foreground hover:text-primary transition-colors font-body">
              Messages
            </a>
          </Link>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/wishlist">
            <a className="p-2 hover:bg-muted rounded-full transition-colors">
              <Heart className="w-6 h-6 text-foreground" />
            </a>
          </Link>
          <NotificationBell />
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <a className="text-foreground hover:text-primary transition-colors font-body">
                  Profile
                </a>
              </Link>
              <Button
                variant="outline"
                onClick={() => setIsLoggedIn(false)}
                className="rounded-full"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setIsLoggedIn(true)}
                className="rounded-full"
              >
                Login
              </Button>
              <Button
                className="rounded-full bg-primary hover:bg-primary/90"
                onClick={() => setIsLoggedIn(true)}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/">
              <a className="text-foreground hover:text-primary transition-colors font-body">
                Browse
              </a>
            </Link>
            <Link href="/dashboard">
              <a className="text-foreground hover:text-primary transition-colors font-body">
                Dashboard
              </a>
            </Link>
            <Link href="/my-properties">
              <a className="text-foreground hover:text-primary transition-colors font-body">
                My Properties
              </a>
            </Link>
            <Link href="/messages">
              <a className="text-foreground hover:text-primary transition-colors font-body">
                Messages
              </a>
            </Link>
            <div className="border-t border-border pt-4 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard">
                    <a className="text-foreground hover:text-primary transition-colors font-body">
                      Profile
                    </a>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full rounded-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsLoggedIn(true)}
                    className="w-full rounded-full"
                  >
                    Login
                  </Button>
                  <Button
                    className="w-full rounded-full bg-primary hover:bg-primary/90"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
