import { createContext, useContext, useState, useEffect } from "react";

type UserRole = "student" | "teacher" | "developer";

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  grade?: number; // For students
  xp?: number; // For students
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  offlineAccess: () => void;
  isAuthenticated: boolean;
  isOffline: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem("user");
    const savedOffline = localStorage.getItem("offline-mode");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedOffline) {
      setIsOffline(JSON.parse(savedOffline));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock authentication - replace with real auth later
    console.log("Login attempted:", { email, role });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: email.split("@")[0],
      ...(role === "student" && { grade: 9, xp: 1250 })
    };
    
    setUser(mockUser);
    setIsOffline(false);
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.removeItem("offline-mode");
  };

  const logout = () => {
    setUser(null);
    setIsOffline(false);
    localStorage.removeItem("user");
    localStorage.removeItem("offline-mode");
    console.log("User logged out");
  };

  const offlineAccess = () => {
    // Enable offline mode for students
    const offlineUser: User = {
      id: "offline-user",
      email: "offline@student.local",
      role: "student",
      name: "Offline Student",
      grade: 9,
      xp: 0
    };
    
    setUser(offlineUser);
    setIsOffline(true);
    localStorage.setItem("user", JSON.stringify(offlineUser));
    localStorage.setItem("offline-mode", "true");
    console.log("Offline access enabled");
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      offlineAccess,
      isAuthenticated: !!user,
      isOffline
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}