import React, { useContext } from 'react'
import './Logout.css'
import App_context from '../../context/App_context';
import { toast } from 'react-toastify';
const Logout = ({setShowLogin,setCurrState}) => {
  const {setisLoggedIn, logoutAdmin }  = useContext(App_context);
  const handleLogout = async () => {
   
      const response = await logoutAdmin();
      if(response?.data?.success){
        setisLoggedIn(false);
        setShowLogin(false);
        setCurrState("login");
        toast.success(response?.data?.message);
      }else{
        toast.error(response?.data?.message);
      }
    
  } 
  return (
    <div className='logout-popup'>
      <h2>Are you sure you want to logout?</h2>
      <div className="btns">
        <button className='yes' onClick={()=>{handleLogout()}}>Yes</button>
        <button className='no' onClick={()=>{setShowLogin(false)}}>No</button>
      </div>
    </div>
  )
}

export default Logout