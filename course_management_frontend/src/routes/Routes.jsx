import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Login from "../components/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../components/Dashboard";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Welcome from "../components/Welcome";

export default function Routes() {
  const { token } = useContext(AuthContext);

  const notAuthenticatedOnlyRoutes = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <div>Register Page</div>,
    },
    {
      path: "/home",
      element: <div>Home</div>,
    },
  ];

  const authenticatedRoutes = [
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
      ],
    },
  ];

  const publicRoutes = [
    {
      path: "/",
      element: <Welcome />,
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...notAuthenticatedOnlyRoutes,
    ...authenticatedRoutes,
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
