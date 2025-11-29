import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const ProtectedRoutes = ({ children, accessBy }) => {
  const { user } = UserAuth();

  if (accessBy === "no-authenticated") {
    if (!user) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  } else if (accessBy === "authenticated") {
    if (user) {
      return children;
    }
  }

  return <Navigate to="/login" />;
};
