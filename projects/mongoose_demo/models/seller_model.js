import mongoose from "mongoose";

//--------------------------------------------------------------------------------------------------

const sellerSchema = new mongoose.Schema({
    name: String,
    email:String
});
const sellerModel = mongoose.model('Seller', sellerSchema);

//-------------------------------------------------------------------------------------------------

export default sellerModel;