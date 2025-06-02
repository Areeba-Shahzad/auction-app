import React, { useState, useEffect } from 'react';
import '../styling/profile-page-styling.css';
import { useNavigate } from 'react-router-dom';

interface searchedAuc {
    title : string,
    description: string;
    startingPrice : number;
    currentPrice : number,
    startingTime: string;
    endingTime: string;
    auctioner : string;
}

interface ProfileData {
    username: string;
    name: string;
    numItems: number;
}


const Profile = () => {

    const [action, setAction] = useState("My Profile");
    const navigate = useNavigate();
    const [searchedAuc, setSearchedAuc] = useState<searchedAuc[] | null>(null);
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const username = localStorage.getItem('username');



    const getProfile = async () => {

            console.log("username:", username);
            if (!username) {
                alert("No user logged in.");
                return; // Exit if no username is stored
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }),
                });


                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log("Data from server:",data);

                if (data.user) {
                    setProfileData(data.user);
                } else {
                    alert("Failed to load profile data.");
                }
            } catch (error: any) {
                alert("An error occurred: " + error.message);
            }
        };


    const allAuctions = async () => {
        console.log("In all auctions")
        try {
            console.log("In try block")
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/getauctions`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
    
          const data = await response.json();
          console.log("data from getAuctions:", data.auc);
    
          if (data){ // successful search check
            setSearchedAuc(data.auc);
          } 
    
        }
        catch (error) {
            console.log(error);
            alert(error)
        }
    }

    useEffect(() => {
        allAuctions();
        getProfile();
    }, [username]);
        
    return (
    <div className='body'>
        <div className='nav'>
            <a href="/profile" className="site-title">My Profile</a>
            <ul>
                <li>
                    <a href="/home">Home</a>
                </li>
                <li>
                    <a href="/browse">Browse</a>
                </li>
            </ul>
        </div>
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            {profileData && searchedAuc ? (
                <>
                <div className='output'>
                    <p>Username: {profileData.username}</p>
                    <p>Name: {profileData.name}</p>
                    <p>Number of items owned: {profileData.numItems}</p>
                </div>
                    {searchedAuc.map((auction, index) => (
                        auction.auctioner === username ? (
                            <div key={index} className="auction-card-profile">
                                <h2>{auction.title}</h2>
                                <p>Description: {auction.description}</p>
                                <p>Starting Price: {auction.startingPrice}</p>
                                <p>Current Price: {auction.currentPrice}</p>
                                <p>Start Time: {auction.startingTime}</p>
                                <p>End Time: {auction.endingTime}</p>
                            </div>
                        ) : null
                    ))}
                </>
            ) : 'Loading...'}
            <div className="submit-container">
                <button onClick={() => { navigate('/createauction') }} className={action === "Browse" ? "submit" : "submit"}>Create Auction</button>
                <button onClick={() => { navigate('/changepassword') }} className={action === "My Profile" ? "submit" : "submit"}>Change Password</button>
                <button onClick={() => { navigate('/') }} className={action === "Browse" ? "submit" : "submit"}>Logout</button>
            </div>
        </div>
    </div>

        
    )
};

export default Profile;