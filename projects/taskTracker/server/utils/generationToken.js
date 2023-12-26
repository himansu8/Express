import jwt from 'jsonwebtoken';
const private_key= 'code'
function generationToken (payload){
    const token = jwt.sign(payload, private_key,{expirein : "1d"})
    console.log("encoded---------------")
    console.log(token)
    return token;
}  
export default generationToken;