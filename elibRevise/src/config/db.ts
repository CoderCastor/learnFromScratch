import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async() => {

    try{

        mongoose.connection.on("connected",()=>{
            console.log(`Connected to the database Successfully`)
        })

        mongoose.connection.on("error",(error)=>{
            console.log(`Error while connecting to the Database ${error}`)
        })

        await mongoose.connect(config.mongodbURI as string)

    }catch(err){
        console.log(`Failed to connect to the Server. ${err}`)
    }

}

export default connectDB;