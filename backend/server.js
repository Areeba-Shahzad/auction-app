import { config } from "dotenv";
config({
  path: "./config.env",
});
import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import {Connect} from './utils/DB.js'
import { Auctions } from "./models/AucModel.js";
import { check_expiration } from "./controllers/Auction.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


// dictionary to store key value pairs, where key is the auction being bid on and socket corresponds to a user
const auc_socket = {};
// list of sockets corresponding to all conneted users
const active_conns = [];

const checkAuctionsEndTime = async () => {

  for (let key in auc_socket){

    const auc = await Auctions.findOne({title : key});
    console.log("Auction to check", key);

    if (check_expiration(auc)){

      for (let i = 0; i < auc_socket[key].length; i++) {
        auc_socket[key][i].emit("Error");
      }
      delete auc_socket.key;
      
    }

  }
  
};

// Run the function every ten seconds
setInterval(checkAuctionsEndTime, 10 * 1000);


io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);

  // disconnect

  socket.on('disconnect', () => {
    const index = active_conns.indexOf(socket);
    if (index !== -1) {
      active_conns.splice(index, 1);
    }

    // Removing socket from auc_socket dictionary
    Object.keys(auc_socket).forEach((key) => {
      const socketIndex = auc_socket[key].indexOf(socket);
      if (socketIndex !== -1) {
        auc_socket[key].splice(socketIndex, 1);
      }
    });
  });
  
  // data consists of the auction title of the auction to be bid for
  socket.on("start_bid", (data) => {
    console.log("auction title recieved", data)
    active_conns.push(socket);
  })

  socket.on("init" ,(data) => {

    if (data in auc_socket){
      auc_socket[data].push(socket);
    }else {
      auc_socket[data] = [socket];
      console.log("updated aucsocket dict", auc_socket);
    }

  })

  // data is a list in this format [auctiontitle, bidamount, bidder]
  socket.on("offer", async (data) => {
    // console.log("auction title recieved",data)
    console.log("auction title recieved",data[0])
    console.log("Bidding amount:", data[1]);
    console.log("User who made the offer", data[2]);

    try {
      await Auctions.findOneAndUpdate(
        { title: data[0] }, 
        { $set: { currentPrice : data[1], currentOwner: data[2] } }, 
        { returnOriginal: false } 
      );

      if (auc_socket[data[0]]) {
        for (let i = 0; i < auc_socket[data[0]].length; i++) {
          auc_socket[data[0]][i].emit("Update", [data[1], data[2]]);
        }
      }

    } catch (error) {
      console.error("Error updating database:", error);
    }
    

  });
});

// io.on("disconnect", (socket) => {

//   console.log("USER DISCONNECTED:", socket.id);

// });



console.log("connection string:",process.env.MONGO_URL);
Connect();

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

