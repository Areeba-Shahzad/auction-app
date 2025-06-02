import { mongoose } from "mongoose";

export const AucModelSchema = new mongoose.Schema ({
    
    id : { 
        type : Number,
        default : 0,
        required : true,
        // unique : true ,
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    startingPrice : {
        type : Number,
        required : true,
    },
    currentPrice : {
        type : Number,
        required : true,
    },
    startingTime : {
        type: String,
        required : true,
    },
    endingTime : {
        type: String,
        required : true,
    },
    auctioner : {
        type: String,
        required : true
    },
    currentOwner : {
        type : String,
        required : true,
    }
    
})

export const Auctions = mongoose.model("Auctions", AucModelSchema);
