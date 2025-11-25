import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import "./MainLayout.scss";

const MainLayout = () => {
return ( <div className="main-layout">
{/* Left Sidebar */} <Sidebar />

  {/* Right Content Area */}
  <div className="main-content">
    <Navbar />

    {/* Page Content Goes Here */}
    <div className="page-content">
      <Outlet />
    </div>
  </div>
</div>

);
};

export default MainLayout;
