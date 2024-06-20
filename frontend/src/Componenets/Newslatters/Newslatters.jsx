import React from 'react'
import './Newslatters.css'

const Newslatters = () => {
  return (
    <div className='news'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe To Our Newslattes & Stay Updated</p>
      <div className="di">
        <input type='email' placeholder='Your Email id'/>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default Newslatters
