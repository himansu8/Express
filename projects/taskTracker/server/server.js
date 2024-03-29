//const express = require('express')
import express from 'express'
import userRoute from './routes/user.route.js'
import taskRoute from './routes/task.route.js'
import './dbConnect.js';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send("server started up fine")
})

app.use('/api/user',userRoute)
app.use('/api/task',taskRoute)




app.listen(port,()=>{
    console.log(`the server started at port no ${port}`)
})