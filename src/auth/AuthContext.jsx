import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (username, role, password) => {
    // Admin Password Protection Logic
    if (role === "admin") {
      const ADMIN_PASSWORD = "admin123"; // You can change this to any password
      if (password !== ADMIN_PASSWORD) {
        alert("Incorrect Admin Password!");
        return false; // Login failed
      }
    }

    const userData = { username, role };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return true; // Login successful
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);