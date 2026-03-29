import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Authentication Context
 * Manages user login state and user information
 */

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: "user" | "landlord" | "admin";
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call an API
    const mockUser: User = {
      id: 1,
      name: "John Doe",
      email: email,
      phone: "+91-9876543210",
      avatar: "J",
      role: "user",
      verified: true,
    };
    setUser(mockUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const signup = async (name: string, email: string, password: string, role: string) => {
    // Mock signup - in production, this would call an API
    const newUser: User = {
      id: Math.random(),
      name: name,
      email: email,
      phone: "",
      avatar: name.charAt(0),
      role: role as "user" | "landlord",
      verified: false,
    };
    setUser(newUser);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
