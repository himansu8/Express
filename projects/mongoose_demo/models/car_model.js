import mongoose, { Schema } from "mongoose";

//--------------------------------------------------------------------------------------------------

const carSchema = new mongoose.Schema({
    name: String,
    modelNo: String,
    price:Number,
    sellerId:{
        type: Schema.Types.ObjectId,
        ref: 'Seller'
    }

});
const carsModel = mongoose.model('Car', carSchema);

//-------------------------------------------------------------------------------------------------

export default carsModel;