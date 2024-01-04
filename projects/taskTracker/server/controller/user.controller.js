import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs/promises';
import bcrypt from 'bcrypt';
import generationToken from '../utils/generationToken.js';
import userModel from '../models/userModel.js';

export const signup = async (req, res) => {
    try {
        let { firstName, lastName, email, phone, password } = req.body


        // duplicate the email and phone
        //let emailFound = fileData.find((ele) => ele.email == email);
        let emailFound =await userModel.findOne({email : email});
        if (emailFound) {
            return res.status(409).json({ error: 'user email already registered' })
        }


        let phoneFound =await userModel.findOne({phone : phone});
        if (phoneFound) {
            return res.status(409).json({ error: 'user phone already registered' })
        }


        // hassing the password
        password = await bcrypt.hash(password, 12)



        let userData = {

            firstName,
            lastName,
            email,
            phone,
            password,

        }
        await userModel.create(userData);



        res.status(200).json({ msg: 'user signup' });
    } catch (error) {
        res.status(500).json({ error: 'something went wrong' });
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // duplicate the email and phone
        let emailFound =await userModel.findOne({email : email});
        if (!emailFound) {
            return res.status(401).json({ error: 'Incorrect email id' })
        }
        let matchPassword = await bcrypt.compare(password, emailFound.password);
        if (!matchPassword) {
            return res.status(401).json({ error: 'Incorrect password' })
        }

        //generation token
        let payload = {
            user_id: emailFound._id
        }
        const token = generationToken(payload)

        res.status(200).json({ msg: 'user login successfully', token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'something went wrong' });
    }
}


