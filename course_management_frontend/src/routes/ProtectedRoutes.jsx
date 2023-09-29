import React from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  }, []);

  return <Outlet />;
};

export default ProtectedRoutes;
