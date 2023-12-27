import jwt from 'jsonwebtoken';
const private_key= 'code'



function authMiddleware(req,res,next){
    try {
        //console.log(req.headers.authorization);
        const token= req.headers.authorization.split(" ")[1]
        console.log(token)
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