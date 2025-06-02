import express from "express";
import cors from "cors";
import { UserRouter } from "./routes/User.js";
import { AuctionRouter } from "./routes/Auction.js";

export const app = express();

app.use(cors({
    origin: "http://localhost:3000", // URL of your React app
    methods: ["GET", "POST"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/auction", AuctionRouter)


