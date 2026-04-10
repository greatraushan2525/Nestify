import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import Dashboard from "./pages/Dashboard";
import PropertyManagement from "./pages/PropertyManagement";
import Bookings from "./pages/Bookings";
import Messages from "./pages/Messages";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Chatbot from "./components/Chatbot";
import Wishlist from "./pages/Wishlist";
import { WishlistProvider } from "./contexts/WishlistContext";

/**
 * Nestify - PG & Hostel Finder
 * Design: Warm Hospitality - Organic shapes, warm colors (coral, gold, sage green), rounded corners
 * Typography: Poppins (display), Nunito (body)
 * Color Palette: Coral (#ff6b6b), Gold (#ffd93d), Sage Green (#6bcf7f), Cream (#fffbf0)
 */

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Chatbot />
      <main>
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/login"} component={Login} />
          <Route path={"/signup"} component={Signup} />
          <Route path={"/property/:id"} component={PropertyDetail} />
          <Route path={"/dashboard"} component={Dashboard} />
          <Route path={"/my-properties"} component={PropertyManagement} />
          <Route path={"/bookings"} component={Bookings} />
          <Route path={"/messages"} component={Messages} />
          <Route path={"reviews"} component={Reviews} />
          <Route path={"wishlist"} component={Wishlist} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <WishlistProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </WishlistProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
