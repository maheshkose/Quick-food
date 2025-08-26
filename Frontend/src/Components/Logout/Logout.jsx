import React from 'react'
import './Logout.css'
import { useContext } from 'react';
import StoreContext from '../../Context/StoreContext';
import { toast } from 'react-toastify';
const Logout = ({ setShowLogin }) => {
    const {  setIsLoggedIn,logout,setUser } = useContext(StoreContext);
    const handleLogout = async () => {
      const spinner = document.querySelector(".spinner");
      spinner.style.display = "block";
    try {
        const response = await logout();
        spinner.style.display = "none";
        if (response?.data?.success) {
          setIsLoggedIn(false);
          setShowLogin(false);
          setUser("");
          toast.success("Logged out successfully");
        } else {
          toast.error(response?.response?.data?.message || "Logout failed");
        }
    } catch (error) {
        
    }
}
 
  return (
    <div className="logout-popup-container">
        <h2 className='title'>Are you sure you want to logout?</h2>
        <button onClick={() => {
         handleLogout();
        }}>Yes
         <div className="spinner"> </div>
        </button>
        <button onClick={() => setShowLogin(false)}>No</button>
      </div>
  )
}

export default Logout