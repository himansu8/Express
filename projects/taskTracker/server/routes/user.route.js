import express from 'express';
import {userAdd, userDelete } from '../controller/user.controller.js'


const router = express.Router();

// router.get('/',(req,res)=>{
//     res.status(200).send('user root route')
// })

router.get('/add', userAdd);

router.get('/delete', userDelete);


export default router;