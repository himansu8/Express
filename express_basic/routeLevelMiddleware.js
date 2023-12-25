const express = require('express')
const app = express()


function middleware1(req, res, next) {
    console.log("First middleware");
    next();
}
function middleware2(req, res, next) {
    console.log("Second middleware");
    next();
}
function main(req, res)  {
    console.log("actual root")
    res.status(200).send("Hello Middleware")
}
app.get('/', middleware1, middleware2,main)

app.get('/test',(req,res)=>{
    console.log("test root");
    res.status(200).send("Hello test ")
})
app.listen(3000, () => {
    console.log("Server Started listening at port no 3000")
})