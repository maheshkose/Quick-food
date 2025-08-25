import React from "react";
import "./Profile.css";
import App_context from "../../context/App_context";
import { useContext } from "react";
import { useState } from "react";
import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";
import Logout from "../../Components/Logout/Logout";
import { assets } from "../../assets/assets";
const Profile = () => {
  const { isLoggedIn, setisLoggedIn,adminDetails } = useContext(App_context);
  const [showLogin, setShowLogin] = useState(isLoggedIn ? false : true);
  const [currState, setCurrState] = useState("login"); // login, register, logout
  return (
    <div className="profile-page">
      <h1>Admin Profile</h1>
      <nav className="profile-nav">
        <div className="register" onClick={() => {setShowLogin(true) ;setCurrState("register")}}>
          Add New admin
        </div>
        {isLoggedIn ? (
          <div className="logout" onClick={() => {setShowLogin(true) ;setCurrState("logout")}}>
            Logout
          </div>
        ) : (
          <div className="login" onClick={() => {setShowLogin(true) ;setCurrState("login")}}>
            Login
          </div>
        )}
      </nav>

      <div className="profile-details">
        <h2>Admin Details</h2>
        {isLoggedIn ? (
          <>
          <p style={{textAlign:"center"}}>You are logged in as Admin.</p>
          <div className="admin-details">
           <div className="admin-image">
            <img src={assets.profile_image} alt="" />
           </div>
            <div className="admin-info">
              <p><strong>Name:</strong> {adminDetails?.name}</p>
              <p><strong>Email:</strong> {adminDetails?.email}</p>
              <p><strong>Role:</strong> {adminDetails?.role}</p>
          </div>

          </div>
          </>
        ) : (
          <p>Please log in to see admin details.</p>
        )}
      </div>

      {showLogin ? (
        <div className="popup">
          {currState === "login" ? (
            <Login setShowLogin={setShowLogin} setCurrState={setCurrState} />
          ) : currState === "register" ? (
            <Register setShowLogin={setShowLogin} setCurrState={setCurrState} />
          ) : currState === "logout" ? (
            <Logout setShowLogin={setShowLogin} setCurrState={setCurrState} />
          ) : (
            <><p>empty</p></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Profile;
