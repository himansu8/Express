import jwt from 'jsonwebtoken';

import config from '../../config/config.js';

const private_key= config.PRIVATE_KEY



function authMiddleware(req,res,next){
    try {
        //console.log("header------------",req.headers.authorization);
        //console.log(req.headers)
        const token= req.headers.authorization.split(" ")[1]
        //console.log(req.headers)
        const decoded = jwt.verify(token,private_key);
        //console.log(decoded);
       //res.status(200).json({msg:"working"})
       req.payload=decoded
       next ();

    } catch (error) {
       console.log(error);
       return res.status(401).json({error : "unauthorised access"}) 
    }
}
export default authMiddleware;