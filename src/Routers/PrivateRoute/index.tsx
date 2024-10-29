import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
