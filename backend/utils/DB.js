import mongoose from 'mongoose';


export const Connect = async () => {    
    mongoose
        .connect(process.env.MONGO_URL)
        .then( () => {console.log("Connected to DB")})
        .catch((err) =>{console.log("Error connecting to DB:", err)})


} 