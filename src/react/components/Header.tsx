import React from "react";
import { apiRouteType } from "../types/api";
import NavBar from "../../library/animated/NavBar";

const Header = ({ routes }: { routes: apiRouteType[] }) => {
  return (
    <div className="dark:text-white relative z-50">
      <NavBar routes={routes} />
    </div>
  );
};

export default Header;
