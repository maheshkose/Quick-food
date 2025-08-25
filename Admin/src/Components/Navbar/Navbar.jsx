import React from "react";
import "./Navbar.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { assets } from "../../assets/assets.js";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src="../quick-food.png" alt="" className="logo" />
      </Link>
      <Link to={"/profile"}>
        <img src={assets.profile_image} alt="" className="profile" />
      </Link>
    </div>
  );
};

export default Navbar;
