import React from 'react'
import './Profile.css'
import { useContext } from 'react'
import StoreContext from '../../Context/StoreContext'
import LoginPopUp from '../../Components/Loginpopup/LoginPopUp'
const Profile = () => {
    const {showLogin, setShowLogin,user,isLoggedIn} = useContext(StoreContext);
  return (
    <>   
        {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
     <div className='profile-page'>
        {/* <div className="head-img">

        <img src="../../../public/header_img.png" alt="" />
        </div> */}
        <div className="login-register">
            <button className='btn' onClick={()=>{setShowLogin(true)}}>{isLoggedIn ? "Logout" : "Login"}</button>
        </div>
        <div className="info">
            <div className="user-img">
                <img src="../../../public/vite.svg" alt="" />
            </div>
            <div className="user-details">
                {isLoggedIn ? <div><h2>{user.name}</h2>
                <p>{user.email}</p></div> : <h1>Please Login</h1>}
                
            </div>    
        </div>
    </div>
    </>

  )
}

export default Profile