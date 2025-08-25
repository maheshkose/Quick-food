import React from 'react'
import './Logout.css'
import { useContext } from 'react';
import StoreContext from '../../Context/StoreContext';
import { toast } from 'react-toastify';
const Logout = ({ setShowLogin }) => {
    const {  setIsLoggedIn,logout,setUser } = useContext(StoreContext);
    const handleLogout = async () => {
    try {
        const response = await logout();
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
        }}>Yes</button>
        <button onClick={() => setShowLogin(false)}>No</button>
      </div>
  )
}

export default Logout