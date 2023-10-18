import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export const Layout = () => {
  const location = useLocation();
  // Define an array of path names where you want to hide the header
  const pathsWithoutHeader = ["/welcome", "/login", "/"];

  // Check if the current path is in the array
  const shouldRenderHeader = pathsWithoutHeader.includes(location.pathname);
  return (
    <div className="container-fluid gx-0 m-0 vh-100">
      {shouldRenderHeader && <Header />}
      <Outlet />
    </div>
  );
};
