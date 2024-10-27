import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? <Navigate to="/Dashboard" /> : children;
};
