import React from 'react'
import './Footer.css'
import logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintrest_icon from '../Assets/pintester_icon.png'
import whatspp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={logo}/>
        <h1>SHPPERS</h1>
      </div>
      <ul className='footer-links'>
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="div footer-social-icons">
        <div className="footer-icons">
          <img src={instagram_icon}/>
        </div>
        <div className="footer-icons">
          <img src={pintrest_icon}/>
        </div>
        <div className="footer-icons">
          <img src={whatspp_icon}/>
        </div>
        </div>
        <div className="footer-copyright">
          <hr/>
          <p>Copyright @ 2023 -All Right Reserved</p>
        </div>
      </div>
  )
}

export default Footer
