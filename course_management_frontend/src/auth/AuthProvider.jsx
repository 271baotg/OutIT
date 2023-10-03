import axios, { AxiosHeaders } from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + auth.token;
      localStorage.setItem("token", auth.token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
