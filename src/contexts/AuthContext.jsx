import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const login = (authToken) => {
    setToken(authToken);
    localStorage.setItem("authToken", authToken);
  }

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  }


  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}