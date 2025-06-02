import express from "express";
import { createAuction, getAuctions } from '../controllers/Auction.js'

export const AuctionRouter = express.Router();

AuctionRouter.post("/createauction", createAuction); // create an auction
AuctionRouter.post("/getauctions", getAuctions); // get all the aucs for browse page
