
import { createContext, useContext, useState } from "react";

// 1. Buat Context
const AuthStateContext = createContext({
  user: null,
  setUser: () => {},
});

// 2. Buat Provider
export const AuthProvider = ({ children }) => {
  const [user, _setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const setUser = (user) => {
    _setUser(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthStateContext.Provider value={{ user, setUser }}>
      {children}
    </AuthStateContext.Provider>
  );
};

// 3. Custom Hook
export const useAuthStateContext = () => useContext(AuthStateContext);