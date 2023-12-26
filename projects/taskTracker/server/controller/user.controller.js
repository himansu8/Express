import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs/promises';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    try {
        let { firstName, lastName, email, phone, password } = req.body
        //read the file 
        let fileData = await fs.readFile('./database/data.json');
        fileData = JSON.parse(fileData);
        console.log(fileData);
        // duplicate the email and phone
        let emailFound = fileData.find((ele) => ele.email == email);
        if (emailFound) {
            return res.status(409).send('user email already registered')
        }
        let phoneFound = fileData.find((ele) => ele.phone == phone);
        if (phoneFound) {
            return res.status(409).send('user phone already registered')
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
       
        res.status(200).send('user signup');
    } catch (error) {
        res.status(500).send('something went wrong');
    }

}

export const login = (req, res) => {
    res.status(200).send('user login');
}


