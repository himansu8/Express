import mongoose from "mongoose";

//----------------------------------for creating collection-----------------------------------------
const kittySchema = new mongoose.Schema({
    name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);


export default Kitten;