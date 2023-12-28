import express from 'express';
import {signup, login } from '../controller/user.controller.js'
import {loginValidation,validationErrors} from '../middlewares/validation/index.js'

const router = express.Router();

// router.get('/',(req,res)=>{
//     res.status(200).send('user root route')
// })

router.post('/signup', signup);

router.post('/login',loginValidation(),validationErrors, login);


export default router; 