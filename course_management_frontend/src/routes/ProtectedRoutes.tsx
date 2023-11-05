import React, { useState } from "react";
import { useContext, useEffect } from "react";
import AuthContext from "../auth/AuthProvider";
import { Outlet, useLocation, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState<Boolean>(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  useEffect(() => {
    console.log(auth);
  }, []);

  return <Outlet />;
};

export default ProtectedRoutes;
