import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const isAdminPath = useMemo(
    () => pathname.startsWith("/admin/dashboard"),
    [pathname]
  );

  if (isAuthenticated && role === "admin" && pathname === "/admin/login") {
    return <Navigate to="/admin/dashboard" />;
  }

  if (
    isAuthenticated &&
    role === "user" &&
    (isAdminPath || pathname === "/admin/login")
  ) {
    return <Navigate to="/" />;
  }

  if (!isAuthenticated && isAdminPath) {
    return <Navigate to="/" />;
  }

  if (
    isAuthenticated &&
    role === "user" &&
    (pathname === "/login" || pathname === "/signup")
  ) {
    return <Navigate to="/" />;
  }

  if (!isAuthenticated && pathname === "/orders") {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && cartItems.length === 0 && pathname === "/checkout") {
    return <Navigate to="/" />;
  }

  if (!isAuthenticated && pathname === "/profile") {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
