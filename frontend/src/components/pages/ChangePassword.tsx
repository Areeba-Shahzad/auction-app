import React, { useState } from 'react';
import '../styling/home-page-styling.css';
import { useNavigate } from 'react-router-dom';
// import handleSubmit from './LoginSignup'

const ChangePassword = () => {

    const [action, setAction] = useState("Change Password");
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChangePassword = async () => {
        console.log("in change password func");
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/changepassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, newPassword }),
            });
            const data = await response.json();

            if (data){ // successful password change check
                console.log(data);
                navigate('/');
            }else {
                alert(data.message); // alert with error message
            }
    
        }
        catch (error) {
            alert(error);
        }
        
    };

    // Function to handle sbmit action
    const handleSubmit = () => {
        console.log("in handle submit func");
        
        if (action === "Change Password") {
            handleChangePassword();
        }
    };

    return (

        <div className='body'>
            <div className='nav'>
                <a href = "/changepassword" className = "site-title">Change Password</a>
                <ul>
                    <li>
                        <a href = "/home">Home</a>
                        
                    </li>
                    <li>
                        <a href = "/browse">Browse</a>
                    </li>
                    <li>
                        <a href = "/profile">My Profile</a>
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
            <div className="inputs">
                
                <div className="input">
                    <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                
                <div className="input">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className="submit-container">
                <button onClick={handleSubmit} className={action === "Browse" ? "submit" : "submit"}>Submit</button>

            </div>
        </div> 
        </div>
    )
};

export default ChangePassword;