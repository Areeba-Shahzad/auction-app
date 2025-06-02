import { Auctions } from "../models/AucModel.js";
import { Users } from "../models/User.js";

export const createAuction = async (req, res, next) => {

    console.log("in create auction");
    console.log("recieved data for create auction");

    try {
        

        let {title, description, startingPrice, currentPrice = startingPrice, startingTime, endingTime, currentOwner, auctioner} = req.body;

        // console.log("value ofauctioner:", auctioner);
        let user = await Users.findOne({username : auctioner})
        // console.log("The auctioner's data:", user);
        let list = user.aucList;
        let id = (user.aucList).length;
        list.push(id); 
        // new auction's id added to the aucList of the auctioner
        await Users.findOneAndUpdate(
            { username: auctioner }, 
            { $set: { aucList: list } }, 
            { returnOriginal: false } 
        );

        if (!title || !description || !startingPrice || !startingTime || !endingTime || !currentOwner || !auctioner) {
            return res.status(400).json({ error: "All fields are required" });
        } 

        const duplicate = await Auctions.findOne({title : title});

        if (duplicate){
            return res.status(400).json({ error: "An auction with this title already exists,kindly choose another title." });

        }

        const auction = await Auctions.create({
            id,
            title,
            description,
            startingPrice,
            currentPrice,
            startingTime,
            endingTime,
            currentOwner, 
            auctioner
        });

        console.log("Auction created successfully: ", auction);

        return res.status(201).json( {auction});
    }catch (error) {

        console.error("Error creating auction:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const check_expiration = (aucs) => {

    // console.log("aucs ending time", aucs.endingTime);

    if (!aucs || !aucs.endingTime) {
      console.error("Ending time is undefined:", aucs);
      return false;
    }

    // console.log("check expr", aucs.title);

    let delimiter = ",";
    let endTime = (aucs.endingTime).split(delimiter);
    delimiter = "-";
    let dateList = endTime[0].split(delimiter);
    let timeList = endTime[1].split(delimiter);

    // console.log("1");

    // changing all readings to numbers
    const year = parseInt(dateList[0], 10);
    const month = parseInt(dateList[1], 10) - 1; 
    const day = parseInt(dateList[2], 10);
    const hour = parseInt(timeList[0], 10);
    const minute = parseInt(timeList[1], 10);

    // console.log("2");


    const expirationDate = new Date(year, month, day, hour, minute);
    const currTime = new Date();

    // console.log("3");

    // console.log("exp date:", expirationDate)
    // console.log("currtimw", currTime);

    return expirationDate < currTime;
}

export const check_start = (aucs) => {

    // console.log("aucs starting time", aucs.startingTime);
    
    if (!aucs || !aucs.endingTime) {
      console.error("Starting time is undefined:", aucs);
      return false;
    }

    // console.log("check str", aucs.title);

    let delimiter = ",";
    let endTime = (aucs.startingTime).split(delimiter);
    delimiter = "-";
    let dateList = endTime[0].split(delimiter);
    let timeList = endTime[1].split(delimiter);

    // console.log("1");

    // changing all readings to numbers
    const year = parseInt(dateList[0], 10);
    const month = parseInt(dateList[1], 10) - 1; 
    const day = parseInt(dateList[2], 10);
    const hour = parseInt(timeList[0], 10);
    const minute = parseInt(timeList[1], 10);

    // console.log("2");

    const startDate = new Date(year, month, day, hour, minute);
    const currTime = new Date();

    // console.log("3");

    // console.log("exp date:", startDate)
    // console.log("currtimw", currTime);

    return startDate > currTime;
}



export const getAuctions = async (req,res) => {

    console.log("In get aucs");
    try {
        const auc = await Auctions.find();
        console.log()
        if (!auc){

            return res.status(400).json({error: "No active auctions"});
        }

        auc.forEach((aucs, index) => {
            if (check_expiration(aucs) || check_start(aucs)) {
                auc[index] = null;
            }
        });

        // Filter out the null values
        const filteredAuc = auc.filter(Boolean);

        return res.status(201).json({ auc: filteredAuc });
        
    }
    catch(error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
            return res.status(500).json({ error: "Internal server error" });
        
    }
}