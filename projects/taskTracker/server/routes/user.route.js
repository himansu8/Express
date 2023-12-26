import express from 'express';
import {signup, login } from '../controller/user.controller.js'


const router = express.Router();

// router.get('/',(req,res)=>{
//     res.status(200).send('user root route')
// })

router.post('/signup', signup);

router.post('/login', login);


export default router; 