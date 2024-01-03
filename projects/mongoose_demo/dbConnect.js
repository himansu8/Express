import mongoose from "mongoose";

async function dbConnect() {

    try {
        await mongoose.connect('mongodb+srv://himansu8:upBVOW2g3pngZl3K@himansudb.11w9kza.mongodb.net/Petsstore');
        console.log("DB connected successfully");
    } catch (error) {
        console.log(error);

    }
}
dbConnect()