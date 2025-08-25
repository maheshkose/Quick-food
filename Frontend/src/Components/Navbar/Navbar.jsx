import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
import { Link } from "react-router-dom";
import StoreContext from '../../Context/StoreContext.jsx';
const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const {getTotalCartAmount,isLoggedIn, setIsLoggedIn} = useContext(StoreContext);

  return (
    <div className='navbar'>

      <Link to={'/'}>
       <img src="../quick-food.png"  alt="" className='logo'/>
      </Link>
      <ul className="navbar-menu">
        <Link to={'/'} className={menu === "home"?"active":""} onClick={()=>setMenu("home")}>home</Link>
        <a href='#explore-menu' className={menu === "menu"?"active":""} onClick={()=>setMenu("menu")}>menu</a>
        <a href='#app-download' className={menu === "mobile-app"?"active":""} onClick={()=>setMenu("mobile-app")}>mobile-app</a>
        <a href='#footer' className={menu === "contact-us"?"active":""} onClick={()=>setMenu("contact-us")}>contact us</a>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        {/* <div className="navbar-search-icons">
          <Link to={"/cart"}>
          <img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "":"dot"}></div>
        </div> */}
        {/* <div className="myorders-navigation">
          <Link to={'/myorders'}>
          <button>Orders</button>
          </Link>
        </div> */}
        {/* <button onClick={()=>{isLoggedIn ?logOut() :setShowLogin(true)}}>{isLoggedIn ? "LogOut":"Sign In"}</button> */}
        
      </div>
    </div>
  )
}

export default Navbar