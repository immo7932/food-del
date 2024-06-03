import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")
    return (
        <div className='login-popup'>
            <form className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon}></img>
                </div>
                <div className='login-popup-inputs'>
                    {currState === "Login" ? <></> : <input type='text' placeholder='Type your name' required></input>}
                    <input type='text' placeholder='enter your mail' required></input>
                    <input type='text' placeholder='enter your password' required></input>
                </div>
                <button >
                    {currState === "Sign up" ? "create account" : "Login"}
                </button>

                <div className='login-popup-condition'>
                    <input type='checkbox' required></input>
                    <p>By continuing i agree to terms of use and privacy policy</p>
                </div>

                {currState === "Login" ? <p>Create a new account? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p> : <p>Already have account ? <span onClick={()=>setCurrState("Login")}>Click here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup