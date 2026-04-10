import { createContext, useContext, useState, ReactNode } from "react";
import { Property } from "@/lib/propertyData";

/**
 * Wishlist Context - Manages saved properties and comparisons
 * Design: Warm Hospitality
 */

interface WishlistContextType {
  wishlist: Property[];
  comparison: Property[];
  addToWishlist: (property: Property) => void;
  removeFromWishlist: (propertyId: number) => void;
  isInWishlist: (propertyId: number) => boolean;
  addToComparison: (property: Property) => void;
  removeFromComparison: (propertyId: number) => void;
  isInComparison: (propertyId: number) => boolean;
  clearComparison: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Property[]>([]);
  const [comparison, setComparison] = useState<Property[]>([]);

  const addToWishlist = (property: Property) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === property.id)) {
        return prev;
      }
      return [...prev, property];
    });
  };

  const removeFromWishlist = (propertyId: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== propertyId));
  };

  const isInWishlist = (propertyId: number) => {
    return wishlist.some((p) => p.id === propertyId);
  };

  const addToComparison = (property: Property) => {
    setComparison((prev) => {
      if (prev.find((p) => p.id === property.id)) {
        return prev;
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 properties at a time");
        return prev;
      }
      return [...prev, property];
    });
  };

  const removeFromComparison = (propertyId: number) => {
    setComparison((prev) => prev.filter((p) => p.id !== propertyId));
  };

  const isInComparison = (propertyId: number) => {
    return comparison.some((p) => p.id === propertyId);
  };

  const clearComparison = () => {
    setComparison([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        comparison,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addToComparison,
        removeFromComparison,
        isInComparison,
        clearComparison,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
