import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import ForgotPassword from "./pages/login/Forget";
import { ToastContainer } from "react-toastify";

const router= createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { 
        index: true, 
        element: <Navigate to="login" replace /> 
      },
      { 
        path: 'login', 
        element: <Login /> 
      },
      { 
        path: 'signup', 
        element: <Signup /> 
      },
      { 
        path: 'forget-password', 
        element: <ForgotPassword /> 
      },
    ],
  },
])

function App() {
  return<>
    <RouterProvider router={router} />;
    <ToastContainer />
  </> 
}
export default App
