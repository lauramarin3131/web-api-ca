import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      setError(null);
      const res = await fetch( "http://localhost:8080/api/users?action=login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);

      const cleanToken = data.token.replace("BEARER ", "");

      setUser({ username });
      setToken(cleanToken);
      localStorage.setItem("token", cleanToken);
      localStorage.setItem("user", JSON.stringify({ username }));
    } catch (err) {
      setError(err.message);
    }
  };

const signup = async (username, password) => {
  try {
    setError(null);
    const res = await fetch("http://localhost:8080/api/users?action=register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Signup failed");
    }

    // login automatically after signup
    await login(username, password);
  } catch (err) {
    setError(err.message);
  }
};

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
