import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow from '../Assets/arrow.png'
import hero_img from '../Assets/hero_image.png'

const Hero = () => {
    return (
        <div className='Hero'>
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt=''/>
                    </div>
                    <p>Collections</p>
                    <p>For everyone</p>
                </div>
                <div className="hero-latest-button">
                    <div>Latest Collections</div>
                    <img src={arrow}/>
                </div>
            </div>
            <div className="hero-right">
            <img src={hero_img}/>
            </div>

        </div>
    )
}

export default Hero
