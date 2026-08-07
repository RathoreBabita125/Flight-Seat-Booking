import { Navigate } from "react-router-dom";
import PassengerDashboard from "../pages/passenger/PassengerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const RoleBasedDash=()=> {

  const {userAuth} = useSelector((state: RootState) => state.userData);

  switch (userAuth?.role) {
    case 'Admin':
      return <AdminDashboard />;

    case 'Passenger':
      return <PassengerDashboard />;

    default:
      return <Navigate to="/login" />;
  }
}
export default RoleBasedDash;