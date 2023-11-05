import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Routes from "./routes/Routes";
import GlobalStyle from "./globalStyle";
import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

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
