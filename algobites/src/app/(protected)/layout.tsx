import React, { ReactNode } from "react";
import MainSideBar from "../component/MainSideBar";
import Navbar from "../component/Navbar";

const ProtectedRouteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex overflow-hidden">
      <MainSideBar />
      <div className="w-full">
        <Navbar gap="small" />
        <div className="sm:px-3 md:px-6 lg:px-12">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedRouteLayout;
