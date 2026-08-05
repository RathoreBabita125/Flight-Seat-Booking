import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import ForgotPassword from "./pages/login/Forget";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedDash from "./routes/roleBased";
import UserManagement from "./pages/admin/UserManagement";
import MyBooking from "./pages/passenger/MyBooking"
import { useAppDispatch } from "./redux/hook";
import { useQuery } from "@apollo/client/react";
import { GET_ME } from "./query/user";
import { useEffect } from "react";
import type { GetMeResponse } from "./datatypes/datatypes";
import { setUser } from "./redux/slice";
import CheckSeat from "./pages/passenger/CheckSeat";
import SeatManagement from "./pages/admin/SeatManagement";
import BookinManagement from "./pages/admin/BookinManagement";
import Profile from "./pages/login/Profile";

const router = createBrowserRouter([
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
  {
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Passenger"]}>
        <Layout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "/dashboard",
        element: <RoleBasedDash />,
      },

      {
        path: "user-management",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <UserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "seats-management",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <SeatManagement/>
          </ProtectedRoute>
        ),
      },
      {
        path: "booking-management",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <BookinManagement/>
          </ProtectedRoute>
        ),
      },

      {
        path: "check-seats",
        element: (
          <ProtectedRoute allowedRoles={["Passenger"]}>
            <CheckSeat />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <ProtectedRoute allowedRoles={["Passenger"]}>
            <MyBooking />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute allowedRoles={["Admin","Passenger"]}>
            <Profile/>
          </ProtectedRoute>
        ),
      },
    ],
  },
])

function App() {

  const dispatch = useAppDispatch();
  const { data } = useQuery<GetMeResponse>(GET_ME);

  useEffect(() => {
    if (data?.getMe) {
      dispatch(setUser(data.getMe));
    }
  }, [data, dispatch]);

  console.log("userdata: ", data)

  return <>
    <RouterProvider router={router} />;
    <ToastContainer />
  </>
}
export default App
