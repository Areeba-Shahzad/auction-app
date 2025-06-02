import { useLocation, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../styling/specificauction.css';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io("http://localhost:8000");

interface searchedAuc {
  title : string,
  description: string;
  startingPrice : number;
  startingTime: string;
  endingTime: string;
  currentOwner : string;
  currentPrice : number;
}
const Bid = () => {
    socket.emit("")
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const title = params.get('title');
    const [searchedAuc, setSearchedAuc] = useState<searchedAuc[] | null>(null);
    const [bidValue, setBidValue] = useState<number>(0);
    const username = localStorage.getItem('username');
    const [updatedVals, setUpdatedVals] = useState<[number, string] | null>(null);
    const navigate = useNavigate();


    const handleBid = (auction : searchedAuc, bidValue : number) => {

      // checks to see if bid value is larger than currentPrice else throw error
      if (auction.currentPrice > bidValue){
        alert("Please enter a bid amount larger than the current price");
      }else {
        // console.log("auction",auction.title);
        socket.emit("offer", [auction.title, bidValue, username]);
      }
  
    }
  
    useEffect(() => {
      console.log("msg received");
  
      socket.on("Update", (data) => {
          console.log("data", data);
          setUpdatedVals(data);
      });
  
      socket.on("Error", (data) => {
          console.log("Bid ended");
          navigate('/browse');
      });
  
    }, []);

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

  useEffect(() => {
    socket.emit("init",title);
  })
  

    // Now, you can use the title in your component
    return (
      
      <div className='body-navbar'>

          <div className='nav'>
                  <a href = "/bid" className = "site-title">Bid</a>
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
                          <a href = "/browse">Browse</a>
                      </li>
                      <li>
                          <a href = "/">Logout</a>
                      </li>
                  </ul>
          </div>
        <div className="auction-details-bid">
          {title && searchedAuc && searchedAuc.length > 0 && !updatedVals? (
        searchedAuc.map((auction: searchedAuc, index: number) => (
        auction.title.includes(title) ? (
        <div key={index} className="auction-info-bid">
            
            <h2 className="auction-title-bid">{auction.title}</h2>
            <p className="description-bid">Description: {auction.description}</p>
            <p>Starting Price: {auction.startingPrice}</p>
            <p>Current Price: {auction.currentPrice}</p>
            <p>Current Owner: {auction.currentOwner}</p>
            <p>Start Time: {auction.startingTime}</p>
            <p>End Time: {auction.endingTime}</p>

            <div className="bid-form">
                <div className="input">
                  <input type="number" 
                    placeholder="Enter Bid Amount" 
                    value={bidValue} 
                    onChange={(e) => setBidValue(Number(e.target.value))}/>
                </div>
                <button type="submit" onClick={() => handleBid(auction, bidValue)}>Place Bid</button>
            </div> 
            
        </div>
    ) : null
    ))
    ) : (
    <div></div>
    )} {title && searchedAuc && searchedAuc.length > 0 && updatedVals? (
      searchedAuc.map((auction: searchedAuc, index: number) => (
      auction.title.includes(title) ? (
      <div key={index} className="auction-info-bid">
          
          <h2 className="auction-title-bid">{auction.title}</h2>
          <p className="description-bid">Description: {auction.description}</p>
          <p>Starting Price: {auction.startingPrice}</p>
          <p>Current Price: {updatedVals[0]}</p>
          <p>Current Owner: {updatedVals[1]}</p>
          <p>Start Time: {auction.startingTime}</p>
          <p>End Time: {auction.endingTime}</p>

          <div className="bid-form">
              <div className="input">
                <input type="number" 
                  placeholder="Enter Bid Amount" 
                  value={bidValue} 
                  onChange={(e) => setBidValue(Number(e.target.value))}/>
              </div>
              <button type="submit" onClick={() => handleBid(auction, bidValue)}>Place Bid</button>
          </div> 
                  
          </div>
          ) : null
          ))
          ) : (
          <div></div>
          )}
      </div>

    </div>
      
  );
};

export default Bid;
