// import React, { useState } from 'react';
// import './login-signup-styling.css';
// import './navstyling.css'


const Navbar = () => {
    return (
        <nav className='nav'>
            <a href = "/home" className = "site-title">Home</a>
            <ul>
                <li>
                    <a href = "/profile">Profile</a>
                    
                </li>
                <li>
                    <a href = "/browse">Browse</a>
                </li>
                    <a href = "/create">Create Auction</a>
                <li></li>
            </ul>
        </nav>
        
    )
};

export default Navbar;