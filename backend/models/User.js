import mongoose from "mongoose";
import { AucModelSchema } from "./AucModel.js";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        // unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    numItems: {
        type: Number,
        required: true,
        default: 0,  // always starting at 0
    },
    aucList: {
        type: [Number],
        required : false,
        default: [],  // always starting empty
    },
});

export const Users = mongoose.model("User", userSchema);

 
