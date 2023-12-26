//const express = require('express')
import express from 'express'
import userRoute from './routes/user.route.js'
const app = express();
const port = 3000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send("server started up fine")
})

app.use('/api/user',userRoute)
app.listen(port,()=>{
    console.log(`the server started at port no ${port}`)
})