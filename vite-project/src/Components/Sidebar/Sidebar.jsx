import React from "react";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";
import { FiGrid, FiUsers, FiUserCheck, FiCalendar, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
const handleLogout = () => {
localStorage.removeItem("access_token");
window.location.href = "/login";
};

return ( <div className="sidebar">

  {/* Logo + Name */}
  <div className="sidebar-header">
    <div className="logo">
      
    </div>
    <div className="clinic-info">
      <h3>Clinic OS</h3>
      <span>Medical Center</span>
    </div>
  </div>

  {/* Menu */}
  <nav className="sidebar-menu">
    <NavLink to="/dashboard">
      <FiGrid size={18} />
      Dashboard
    </NavLink>

    <NavLink to="/main/patients">
      <FiUsers size={18} />
      Patients
    </NavLink>

    <NavLink to="/main/doctors">
      <FiUserCheck size={18} />
      Doctors
    </NavLink>

    <NavLink to="/main/appointments">
      <FiCalendar size={18} />
      Appointments
    </NavLink>
  </nav>

  {/* Logout */}
  <div className="sidebar-logout">
    <button onClick={handleLogout}>
      <FiLogOut size={18} />
      Logout
    </button>
  </div>
</div>

);
};

export default Sidebar;
