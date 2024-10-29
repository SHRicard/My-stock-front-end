import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("authToken") !== null;

  return isAuthenticated ? children : <Navigate to="/" />;
};
