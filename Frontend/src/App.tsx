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
import { useEffect, useState } from "react";
import type { GetMeResponse } from "./datatypes/datatypes";
import { setLoading, setUser } from "./redux/authSlice";
import SeatManagement from "./pages/admin/SeatManagement";
import BookinManagement from "./pages/admin/BookinManagement";
import Profile from "./pages/login/Profile";
import BookSeat from "./pages/passenger/BookSeat";
import LoadingCompo from "./common/Loading";
import FlightImage from "./assets/Flight_Image.jpg"
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
            <SeatManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "booking-management",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <BookinManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "book-seat",
        element: (
          <ProtectedRoute allowedRoles={["Passenger"]}>
            <BookSeat />
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
          <ProtectedRoute allowedRoles={["Admin", "Passenger"]}>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

function App() {

  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const { data, loading } = useQuery<GetMeResponse>(GET_ME);

  useEffect(() => {
    const img = new Image();
    img.src = FlightImage;
    img.onload = () => setLoader(true);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (data?.getMe) {
        dispatch(setUser(data.getMe));
      }
      dispatch(setLoading(false));
    }
  }, [data, loading, dispatch]);

  if (!loader) {
    return <LoadingCompo />
  }

  return <>
    <RouterProvider router={router} />;
    <ToastContainer />
  </>
}
export default App
