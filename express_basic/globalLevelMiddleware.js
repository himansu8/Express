const express = require('express');
const app = express();



function globalMiddleware(req, res, next) {
    console.log("globalMiddleware");
    next();
}
app.use(globalMiddleware);



app.get('/first', (req, res) => {
    console.log('first route')
    res.status(200).send("first route success")
})

//app.use(globalMiddleware);


app.get('/second', (req, res) => {
    console.log('second route')
    res.status(200).send("second route success")
})


app.listen(3000, () => {
    console.log("server started at port no 3000")
})