import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("USER_LOGIN");
    return u ? JSON.parse(u) : null;
  });

  const login = (userData) => {
    localStorage.setItem(
      "USER_LOGIN",
      JSON.stringify(userData)
    );
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("USER_LOGIN");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
