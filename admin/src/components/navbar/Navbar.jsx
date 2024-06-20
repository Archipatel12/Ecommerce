import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navprofile from '../../assets/nav-profile.svg'

const navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="logo" className='nav-logo'></img>
      <img src={navprofile} alt="profile" className='nav-profile'></img>
    </div>
  )
}

export default navbar
