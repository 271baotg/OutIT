import axios, { AxiosHeaders } from "axios";
import { createContext, useEffect, useState } from "react";
import { json, useLocation } from "react-router-dom";

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {

  const initialAuth = () => {
    if(sessionStorage.getItem("auth")){
      return JSON.parse(sessionStorage.getItem("auth"));
    }
  }



  const [auth, setAuth] = useState(initialAuth);

  useEffect(() => {
    if(auth){
      sessionStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth])


  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
