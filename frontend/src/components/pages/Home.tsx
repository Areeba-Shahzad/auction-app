import React, { useState } from 'react';
import '../styling/home-page-styling.css';
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is used correctly

const Home = () => {
    const navigate = useNavigate(); // This should be inside the component function, not commented out

    const [action, setAction] = useState("Home");

    return (

        <div className='body'>
            <div className='nav'>
                <a href = "/home" className = "site-title">Home</a>
                <ul>
                    <li>
                        <a href = "/profile">Profile</a>
                        
                    </li>
                    <li>
                        <a href = "/browse">Browse</a>
                    </li>
                    <li>
                        <a href = "/createauction">Create Auction</a>
                    </li>
                    <li>
                        <a href = "/changepassword">Change Password</a>
                    </li>
                    <li>
                          <a href = "/">Logout</a>
                    </li>
                </ul>
            </div>
            <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="submit-container">
                <button onClick={() => {navigate('/profile')}} className={action === "My Profile" ? "submit" : "submit"}>My profile</button>
                <button onClick={() => {navigate('/browse')}} className={action === "Browse" ? "submit" : "submit"}>Browse</button>

            </div>
        </div> 
        </div>      
    );
};

export default Home;
