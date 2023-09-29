import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AuthProvider from "./auth/AuthProvider";
import Routes from "./routes/Routes";
import GlobalStyle from "./globalStyle";

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
   
   
  return <AuthProvider>
         <GlobalStyle/>
         < Routes/>
      </AuthProvider>
}

export default App;
