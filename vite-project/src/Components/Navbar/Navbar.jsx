import React from "react";
import "./Navbar.scss";
import { FiBell } from "react-icons/fi";
import profile from '../../assets/profil-picture.jpg'

const Navbar = () => {
return ( <div className="navbar">
{/* Left Section */} <div className="navbar-left"> <h2>Clinic Intake & Scheduling</h2> </div>


  {/* Right Section */}
  <div className="navbar-right">
    <button className="bell-btn">
      <FiBell size={20} />
    </button>

    <div className="profile">
      <img
        src={profile}
        alt="Profile"
      />
      <div className="profile-info">
        <span className="name">Dr. Emily Carter</span>
        <span className="role">Cardiologist</span>
      </div>
    </div>
  </div>
</div>


);
};

export default Navbar;
