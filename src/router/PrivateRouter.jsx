import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { currentUser } = useAuthContext();

  return currentUser ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRouter;
