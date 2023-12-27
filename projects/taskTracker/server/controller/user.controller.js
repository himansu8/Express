import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs/promises';
import bcrypt from 'bcrypt';
import generationToken from '../utils/generationToken.js';

export const signup = async (req, res) => {
    try {
        let { firstName, lastName, email, phone, password } = req.body
        //read the file 
        let fileData = await fs.readFile('./database/data.json');
        fileData = JSON.parse(fileData);
        //console.log(fileData);
        // duplicate the email and phone
        let emailFound = fileData.find((ele) => ele.email == email);
        if (emailFound) {
            return res.status(409).json({ error: 'user email already registered' })
        }
        let phoneFound = fileData.find((ele) => ele.phone == phone);
        if (phoneFound) {
            return res.status(409).json({ error: 'user phone already registered' })
        }


        // hassing the password
        password = await bcrypt.hash(password, 12)



        let userData = {
            id: uuidv4(),
            firstName,
            lastName,
            email,
            phone,
            password,
            task: []
        }
        //console.log(obj);

        //write to file
        fileData.push(userData)
        await fs.writeFile('./database/data.json', JSON.stringify(fileData))

        // console.log(req.body)
        // let id = uuidv4();
        // console.log('id:' , id)

        res.status(200).json({ msg: 'user signup' });
    } catch (error) {
        res.status(500).json({ error: 'something went wrong' });
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //read the file 
        let fileData = await fs.readFile('./database/data.json');
        fileData = JSON.parse(fileData);
        //console.log(fileData);
        // duplicate the email and phone
        let emailFound = fileData.find((ele) => ele.email == email);
        console.log(emailFound)
        if (!emailFound) {
            return res.status(401).json({ error: 'Incorrect email id' })
        }
        let matchPassword = await bcrypt.compare(password, emailFound.password);
        if (!matchPassword) {
            return res.status(401).json({ error: 'Incorrect password' })
        }

        //generation token
        let payload = {
            email: emailFound.email
        }
        const token = generationToken(payload)

        res.status(200).json({ msg: 'user login successfully' , token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'something went wrong' });
    }
}


