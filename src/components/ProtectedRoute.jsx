import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner/Spinner";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();

  //1. Load the authenticated user
  const { user, isPending, isAuthenticated } = useUser();

  //2. If there is NO authenticated user, redirect to the login
  // if (!user) return <Navigate to="/login" replace />;
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate("/login");
    },
    [isAuthenticated, isPending, navigate]
  );

  //3. While loading, show a spinner
  if (isPending) return <Spinner />;

  //4. if there is a user, render the app
  if (isAuthenticated) return <Outlet />;
}

export default ProtectedRoute;
