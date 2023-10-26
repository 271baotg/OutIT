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
import { ChakraProvider } from "@chakra-ui/react";
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
    <ChakraProvider>
      <AuthProvider>
        <GlobalStyle />
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
