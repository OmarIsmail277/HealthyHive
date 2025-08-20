// MainLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const noBgRoutes = ["/login", "/register"];

  const shouldHaveBg = !noBgRoutes.includes(location.pathname);

  return (
    <div className={shouldHaveBg ? "bg-gray-50 min-h-screen" : ""}>
      <Outlet />
    </div>
  );
}
