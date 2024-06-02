import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
     <div className='footer-content'>
        <div className='footer-content-left'>
            <img src={assets.logo}></img>
            <p>means that it will create three paragraphs of lorem ipsum text and each paragraph contains one hundred words. Both the two parameters are optional, if you leave them empty, the plugin will use</p>
            <div className='footer-social-icons'>
            <img src={assets.facebook_icon}></img>
            <img src={assets.twitter_icon}></img>
            <img src={assets.linkedin_icon}></img>

            </div>
        </div>
        <div className='footer-content-center'>

        </div>
        <div className='footer-content-right'>

        </div>
     </div>
    </div>
  )
}

export default Footer