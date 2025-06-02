import React, { useState, useEffect } from 'react';
import '../styling/browse.css';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';



interface searchedAuc {
    title : string,
    description: string;
    startingPrice : number;
    startingTime: string;
    endingTime: string;
    auctioner : string;
}


const Browse = () => {

    const [title, setTitle] = useState("");
    const [searchedAuc, setSearchedAuc] = useState<searchedAuc[] | null>(null);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    
    const handlebidding = (auction : searchedAuc) => {

        const socket = io("http://localhost:8000");
        // console.log("auction",auction.title);
        socket.emit("start_bid", auction.title)
        
    }

    const allAuctions = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auction/getauctions`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
    
          const data = await response.json();
    
          if (data){ // successful search check
            setSearchedAuc(data.auc);
            // allAucs = data.auc;
            console.log(data);
          } 
    
        }
        catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        allAuctions();
    }, []);

    return (

        <div className='body'>
            <div className='nav'>
                <a href = "/browse" className = "site-title">Browse</a>
                <ul>
                    <li>
                        <a href = "/profile">Profile</a>
                        
                    </li>
                    <li>
                        <a href = "/home">Home</a>
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
                <div className="search-container">
                    <input type="text" placeholder = 'Search Title...' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <button>Search</button>
                </div>

                {!title && searchedAuc && searchedAuc.length > 0 ? (
                    searchedAuc.map((auction: searchedAuc, index: number) => (
                        <div key={index} className="auction-card">
                            <div className="auction-details">
                                <h2 className="auction-title">{auction.title}</h2>
                                <p className="description">Description: {auction.description}</p>
                                <p>Starting Price: {auction.startingPrice}</p>
                                <p>Start Time: {auction.startingTime}</p>
                                <p>End Time: {auction.endingTime}</p>
                                <button onClick = {() =>  {
                                    if (auction.auctioner !== username) {
                                        navigate(`/bid?title=${encodeURIComponent(auction.title)}`);
                                        // Assuming handlebidding() is defined somewhere in your component
                                        handlebidding(auction);
                                    } else {
                                        alert("You can not bid on your own auction");
                                    }
                                    }}
                                >
                                Bid</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div></div>
                )}
                {title && searchedAuc && searchedAuc.length > 0 ? (
                    searchedAuc.map((auction: searchedAuc, index: number) => (
                    auction.title.includes(title) ? (
                    <div key={index} className="auction-card">
                        <div className="auction-details">
                            <h2 className="auction-title">{auction.title}</h2>
                            <p className="description">Description: {auction.description}</p>
                            <p>Starting Price: {auction.startingPrice}</p>
                            <p>Start Time: {auction.startingTime}</p>
                            <p>End Time: {auction.endingTime}</p>
                            <button onClick = {() =>  {
                                if (auction.auctioner !== username) {
                                    navigate(`/bid?title=${encodeURIComponent(auction.title)}`);
                                    // Assuming handlebidding() is defined somewhere in your component
                                    handlebidding(auction);
                                } else {
                                    alert("You can not bid on your own auction");
                                }
                                }}
                            >
                            Bid</button>
                        </div>
                    </div>
                ) : null
                ))
                ) : (
                <div></div>
                )}

        </div>
        </div>
    )
};

export default Browse;