import mongoose from "mongoose";
import 'dotenv/config'


//console.log(process.env.MONGODB_URI)



async function dbConnect() {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected successfully");
    } catch (error) {
        console.log(error);

    }
}
dbConnect()