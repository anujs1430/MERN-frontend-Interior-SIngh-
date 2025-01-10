import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Redirect logged-in users from /login or /register to /admin/header
  if (
    token &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/admin/header" replace />;
  }

  // Redirect logged-in users from /admin to /admin/header
  if (token && location.pathname === "/admin") {
    return <Navigate to="/admin/header" replace />;
  }

  // Redirect unauthenticated users from protected routes
  if (!token && location.pathname.startsWith("/admin")) {
    return <Navigate to="/login" replace />;
  }

  // Allow access to protected content
  return children;
};

export default ProtectedRoutes;
