import React from 'react'
import './Bottom_navbar.css'
import { Link } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
const Bottom_navbar = () => {
  return (
    <div className='bottom-navbar'>
        <div className="navbar-items">
            <div className="navbar-item">
                <Link to={'/'}><GoHomeFill/><span>Home</span></Link>
            </div>
              <div className="navbar-item">
                <Link to={'/cart'}><FaShoppingCart/><span>Cart</span></Link>
            </div>
              <div className="navbar-item">
                <Link to={'/myorders'}><BsFillCartCheckFill/><span>Orders</span></Link>
            </div>
              <div className="navbar-item">
                <Link to={'/profile'}><CgProfile/><span>You</span></Link>
            </div>
        </div>
    </div>
  )
}

export default Bottom_navbar