import express from "express";
import './dbConnect.js';
import mongoose from "mongoose";
import carsModel from "./models/car_model.js";
//import Kitten from "./models/kitten_model.js";
import sellerModel from "./models/seller_model.js";

const app = express();

app.use(express.json());
//---------------------------------------------------------------------------------------------
// app.get('/create', async (req, res) => {

//     try {
//         //const fluffy = new Kitten({ name: 'fluffy' }); //creating a documents 
//         //await fluffy.save();                           // saving that doc to a DB


//         // const fluffy = await Kitten.create({name:"tommy"})   // create and save the doc
//         await carsModel.create({ name: "audi" })   // create and save the doc

//         res.status(200).send("server is up")
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("somethimg went wrong")
//     }

// })

//---------------------------------------------------------------------------------

app.post('/car/:sellerId', async (req, res) => {

    try {
        const { name, modelNo, price } = req.body;
        const { sellerId } = req.params;


        // is valid seller id 
        if (!mongoose.isValidObjectId(sellerId)) {
            return res.status(404).json({ error: "invalid seller id" })

        }
        //seller exist or not in database    
        const sellerFound = await sellerModel.findById(sellerId);
        if (!sellerFound) {
            return res.status(404).json({ error: "Seller not found" })
        }


        let carInfo = {
            name,
            modelNo,
            price,
            sellerId
        }
        console.log(req.body, req.params)
        await carsModel.create(carInfo)   // create and save the doc

        res.status(200).send(`car ${name} got added to seller ${sellerId}`)
    } catch (error) {
        console.log(error);
        res.status(500).send("somethimg went wrong")
    }

})

app.post('/create/seller', async (req, res) => {

    try {
        const { name, email } = req.body;

        let sellerInfo = {
            name,
            email
        }
        await sellerModel.create(sellerInfo)   // create and save the doc

        res.status(200).send(`seller ${name} added`)
    } catch (error) {
        console.log(error);
        res.status(500).send("somethimg went wrong")
    }

})

app.get('/car/:carId', async (req, res) => {

    try {
        const { carId } = req.params;

        // is valid seller id 
        if (!mongoose.isValidObjectId(carId)) {
            return res.status(404).json({ error: "invalid car id" })

        }
        //seller exist or not in database    
        const carFound = await carsModel.findById(carId).populate('sellerId','name email-_id');
        if (!carFound) {
            return res.status(404).json({ error: "Car not found" })
        }


        res.status(200).json(carFound)
    } catch (error) {
        console.log(error);
        res.status(500).send("somethimg went wrong")
    }

})

app.listen(3000, () => {
    console.log("server run at port 3000")
})