import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data);
           // console.log('Response:', response.data);

            if (response.data.success) {  // Fix the spelling mistake
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                console.log(response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className='login-popup-inputs'>
                    {currState === "Login" ? null : (
                        <input
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            type='text'
                            placeholder='Type your name'
                            required
                        />
                    )}
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type='email'  // Change to 'email' type for validation
                        placeholder='Enter your email'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type='password'  // Change to 'password' type for masking input
                        placeholder='Enter your password'
                        required
                    />
                </div>
                <button type='submit'>
                    {currState === "Sign up" ? "Create account" : "Login"}
                </button>
                <div className='login-popup-condition'>
                    <input type='checkbox' required />
                    <p>By continuing, I agree to the terms of use and privacy policy</p>
                </div>
                {currState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrState("Sign up")}>Create</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
