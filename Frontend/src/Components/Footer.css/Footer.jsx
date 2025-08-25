import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quos sint magnam totam minus deserunt nemo iure libero inventore unde atque voluptatum perspiciatis, eius tenetur distinctio corporis ut ipsam eum?</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>privacy policy</li>
                    </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get In touch</h2>
                <ul>
                    <li>+912656567553</li>
                    <li>ms@kose@gmail.com</li>
                </ul>
            </div>
            <p className="footer-copyright">CopyRight 2025 © Tomato : All Rights reserved</p>
        </div>
    
    </div>
  )
}

export default Footer