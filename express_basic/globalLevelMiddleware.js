const express = require('express');
const app = express();



function globalMiddleware(req, res, next) {
    console.log("globalMiddleware");
    next();
}

function globalMiddleware1(req, res, next) {
    console.log("globalMiddleware last");
    next();
}
app.use(globalMiddleware);




app.get('/first', (req, res) => {
    console.log('first route')
    res.status(200).send("first route success")
})

//app.use(globalMiddleware);


app.get('/second', (req, res,next) => {
    console.log('second route')
    res.status(200).send("second route success")
    next();
})

app.use(globalMiddleware1);

app.get('/*',(req,res)=>{
    res.status(404).send("route not found");
})


app.listen(3000, () => {
    console.log("server started at port no 3000")
})