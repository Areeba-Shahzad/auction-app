import { Users } from "../models/User.js";
import { Auctions } from "../models/AucModel.js";
import { check_expiration } from "./Auction.js";

export const createUser = async (req, res, next) => {

    console.log("in create user func");
    console.log("Received data for signup:", req.body);

    try {
        let { name, username, password, numItems = 0, aucList = [] } = req.body;

        // Checks for missing input
        if (!name || !username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Checks to see if this username is already in the DB
        const userExists = await Users.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "A user with this username already exists" });
        }

        // Create user
        const user = await Users.create({
            name,
            username,
            password,
            numItems, 
            aucList
        });

        console.log("User created successfully:", user);

        return res.status(201).json({ user });
    } catch (error) {
        console.error("Error creating user:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const authUsers = async (req,res) => {
    try {

        const{username, password} = req.body;
        
        if (!username || !password){
            return res.status(400).json({error:"All fields are required"});
        }
        const user = await Users.findOne({username});

        if (user && (user.password === password)) {
            console.log("User logged-in successfully:", user)
            return res.status(200).json({user});
        }
        else {
            res.status(401).json({ message: "User not found / password incorrect" });
        }
    }
    catch (error) {
        return res.status(500).json({error : error.message});
    }
}

export const changePassword = async (req,res) => {
    try {

        console.log("In change password func:", req.body);

        const{username, password, newPassword} = req.body;
        
        if (!username || !password || !newPassword){
            return res.status(400).json({error:"All fields are required"});
        }

        const user = await Users.findOne({username});

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password === password) {
            // Directly compare the plaintext passwords

            user.password = newPassword; // Directly assign the new password (also in plaintext)
            await user.save();
            console.log("Password changed successfully");
            return res.status(200).json({ message: "Password updated successfully" });
        } else {
            return res.status(401).json({ message: "Incorrect password" });
        }
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getUsers = async (req,res) => {
    try {

        console.log("In getUsers func:", req.body);

        const{username} = req.body;
        
        if (!username){
            return res.status(400).json({error:"All fields are required"});
        }
        const auc = await Auctions.find();
        let items = 0;

        auc.forEach((aucs, index) => {
            if (check_expiration(aucs) && username != aucs.auctioner && username === aucs.currentOwner) {
                items++;
            }
        });
 
        const user = await Users.findOneAndUpdate(
            { username: username }, 
            { $set: { numItems: items } }, 
            { returnOriginal: false } 
        );

        if (user) {
            console.log("User found:", user)
            return res.status(200).json({user});
        }
        else {
            res.status(401).json({ message: "User not found" });
        }
    }
    catch (error) {
        return res.status(500).json({error : error.message});
    }
}

export const getAuctions = async (req,res) => {

    console.log("In get aucs");
    try {
        const auc = await Auctions.find();
        console.log()
        if (!auc){

            return res.status(400).json({error: "No active auctions"});
        }

        return res.status(201).json({ auc });
        
    }
    catch(error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
            return res.status(500).json({ error: "Internal server error" });
        
    }
}