import React, { useEffect } from "react";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { apiRouteType } from "./types/api";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

const Root = ({ apiRoutes }: { apiRoutes: apiRouteType[] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname! == "/") {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Header routes={apiRoutes} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
