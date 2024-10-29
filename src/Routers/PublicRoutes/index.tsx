import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("authToken") !== null;

  return isAuthenticated ? <Navigate to="/Dashboard" /> : children;
};
