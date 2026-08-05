import { Navigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../datatypes/datatypes";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const ProtectedRoute = ({ children, allowedRoles}:ProtectedRouteProps) => {

  const {userAuth} = useSelector((state: RootState) => state.userData);

  console.log("In protected route", userAuth)
  console.log("In protected route role: ", userAuth?.role)

  if (!userAuth?.role || !userAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userAuth?.role)) {
    return <Navigate to="/unauthorize" replace />;
  }

  return children;

};
export default ProtectedRoute;