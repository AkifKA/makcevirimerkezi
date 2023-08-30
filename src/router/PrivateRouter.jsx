import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRouter;
