import React, { useContext } from "react";
import Login from "../components/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import {
  Route,
  Router,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";
import Welcome from "../components/Welcome";
import Header from "../components/Header";
import { Layout } from "../components/Layout";
import Dashboard from "../components/Dashboard/Dashboard";
import Course from "../components/Course/Course";
import Plan from "../components/Plan/Plan";
import About from "../components/About/About";
import { Register } from "../components/Register/Register";

const Routes = () => {
  // const notAuthenticatedOnlyRoutes = [
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/register",
  //     element: <div>Register Page</div>,
  //   },
  //   {
  //     path: "/home",
  //     element: <div>Home</div>,
  //   },
  // ];

  // const authenticatedRoutes = [
  //   {
  //     element: <ProtectedRoutes />,
  //     children: [
  //       {
  //         path: "/dashboard",
  //         element: <div>Dashboard</div>,
  //       },
  //       {
  //         path: "/profile",
  //         element: <div>User Profile</div>,
  //       },
  //     ],
  //   },
  // ];

  // const publicRoutes = [
  //   {
  //     path: "/",
  //     element: <Welcome />,
  //     children: [notAuthenticatedOnlyRoutes, authenticatedRoutes],
  //   },
  // ];

  // const router = createBrowserRouter([
  //   ...publicRoutes,
  //   ...notAuthenticatedOnlyRoutes,
  //   ...authenticatedRoutes,
  // ]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register/>}/>
        <Route element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="course" element={<Course />} />
          <Route path="plan" element={<Plan />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
};

export default Routes;
