import jwt from 'jsonwebtoken';
const private_key= 'code'



function authMiddleware(req,res,next){
    try {
        console.log(req.headers.authorization);
        res.status(200).json({msg:"working"})
    } catch (error) {
       console.log(error);
       return res.status(401).json({error : "unauthorised access"}) 
    }
}
export default authMiddleware;