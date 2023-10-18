import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Routes from "./routes/Routes";
import GlobalStyle from "./globalStyle";
import React from "react";

// const router = createBrowserRouter(
//    createRoutesFromElements(
//       <Route path='/' element={<Welcome/>}>
//          <Route path='/welcome' element={<Welcome />} />
//          <Route element={ProtectedRoutes}>
//             <Route path='/dashboard' element={<Dashboard />} />
//          </Route>
//       </Route>
//    )
// );

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes />
    </AuthProvider>
  );
}

export default App;