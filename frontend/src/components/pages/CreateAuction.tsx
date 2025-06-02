import React, { useState } from 'react';
import '../styling/createauction.css';

const CreateAuction = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startingPrice, setStartingPrice] = useState("");
    const [startingTime, setStartingTime] = useState("");
    const [endingTime, setEndingTime] = useState("");

    // the user who wants to create the auc
    const username = localStorage.getItem('username'); 
    const auctioner = username;
    const currentOwner = username;
    // let id = 0;
    // let currentPrice = 0;

    console.log("The user who wants to create the auction: ", username);

    const handleCreateAuc = async () => {
      
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auction/createauction`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({title, description, startingPrice, startingTime, endingTime, currentOwner, auctioner}),
      });

      const data = await response.json();

      if (data){ // successful create auction
          alert("Auction created successfully.")
          console.log(data);
          // localStorage.setItem('username', data.user.username);
      }else {
          alert(data.message); // alert with error message
      }

      }
      catch (error) {
        alert(error);
      }
    }
    
    return (
      <div className='body'>
        <div className='nav'>
                <a href = "/createauction" className = "site-title">Create Auction</a>
                <ul>
                    <li>
                        <a href = "/profile">Profile</a>
                        
                    </li>
                    <li>
                        <a href = "/browse">Browse</a>
                    </li>
                    <li>
                        <a href = "/home">Home</a>
                    </li>
                    <li>
                        <a href = "/changepassword">Change Password</a>
                    </li>
                    <li>
                          <a href = "/">Logout</a>
                    </li>
                </ul>
            </div>
            <div className='container'>
          <div className='header'>
              <div className='text'>Create Auction</div>
              <div className='underline'></div>
          </div>

          <div className = 'inputs'>

            <div className="input">
              <input type="text" placeholder = 'Title' value={title} onChange={(e) => setTitle(e.target.value)} />  
            </div>
            <div className="input">
              <input type="text" placeholder = 'Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="input">
              <input type="text" placeholder = 'Starting Price' value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} />  
            </div>
            <div className="input">
              <input type="text" placeholder = 'Start Date and Time(24h clock) (yyyy-mm-dd,hh-mm)' value={startingTime} onChange={(e) => setStartingTime(e.target.value)} />   
            </div>
            <div className="input">
              <input type="text" placeholder = 'End Date and Time(24h clock) (yyyy-mm-dd,hh-mm)' value={endingTime} onChange={(e) => setEndingTime(e.target.value)} />
            </div> 
          </div> 
          <div className = "submit-container">
            <button onClick = {handleCreateAuc} className = "submit gray">Submit</button>
          </div>      
      </div>
      </div>
      
      
    )
}

export default CreateAuction
