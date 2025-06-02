import React, { useState } from 'react';
import '../styling/login-signup-styling.css'
import { useNavigate } from 'react-router-dom';


const LoginSignup = () => {

    // Default state set to Sign up
    const navigate = useNavigate();
    const [action, setAction] = useState("Sign Up");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");  // Only for signup
    const [newPassword, setNewPassword] = useState("");

    // Function to handle login
    const handleLogin = async () => {
        console.log("in handle login func");

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data){ // successful login check
                // console.log("data",data);
                // console.log("data.username: ",data.user.username);
                // console.log("resonse:",response);
                localStorage.setItem('username', data.user.username);
                navigate('/home');
            }else {
                alert(data.message); // alert with error message
            }
        }
        catch (error) {
            alert(error);
        }  
    };

    // Function to handle signup
    const handleSignUp = async () => {
        console.log("in handle sign up func");
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, username, password }),
            });
            const data = await response.json();

            if (data){ // successful signup check
                console.log(data);
                localStorage.setItem('username', data.user.username);
                navigate('/home');
            }else {
                alert(data.message); // alert with error message
            }
    
            // Handle response here
        }
        catch (error) {
            alert(error);
        }
        
    };

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
        
        if (action === "Login") {
            handleLogin();
        } else if (action === "Sign Up") {
            handleSignUp();
        } else if (action === "Change Password") {
            handleChangePassword();
        }
    };

    // The JSX for rendering the component
    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" || action === "Change Password"? null : (
                    <div className="input">
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                )}
                {action !== "Change Password"? null : (
                    <div className="input">
                        <input
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                )}
                <div className="input">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>

            {action === "Sign Up"?<div></div>:<div className = "change-password"> Change password? <span onClick={() => setAction("Change Password")}>Click here!</span></div>}
            <div className="submit-container">
                <button onClick={handleSubmit} className={action === "Login" ? "submit" : "submit gray"}>Submit</button>
                <button onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")} className={action === "Login" ? "submit gray" : "submit"}>
                    {action === "Login" ? "Sign Up" : "Login"}
                </button>
            </div>
        </div>
    );
};

export default LoginSignup;
