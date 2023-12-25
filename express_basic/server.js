const express = require('express')
const app = express()
const port = 3000
app.use(express.json());    //middleware
//-----------------------------------------------------------------------
app.get('/', (req, res) => {
  console.log(req.url)
  console.log(req.method)
  console.log(req.headers)
  res.send('Hello World!!!!')
})

app.get('/todo', (req, res) => {
  res.send('Hello todo')
})

app.get('/users', (req, res) => {
  res.send('Hello users')
})
//-----------------------------------------------------------------------
app.post('/comment', (req, res) => {
  console.log(req.body)
  res.send('comment post successfully')
})

app.post('/commentquery', (req, res) => {
  console.log(req.body)
  console.log(req.query)
  res.send('query post successfully')
})

app.post('/commentParams/:id', (req, res) => {
  //console.log(req.body)
  console.log(req.params)
  res.send('params post successfully')
})
//------------------------------------------------------------------------
app.get('/users/:user', (req, res) => {
  console.log(req.params)
  console.log(req.body)
  res.send(`this is the profile of ${req.params.user}`)
})
//------------------------------------------------------------------------
app.get('/add/:n1/:n2', (req, res) => {
  console.log(req.params)
  let sum= Number(req.params.n1)+Number(req.params.n2)
  res.send(`this sum is  ${sum}`)
})
//------------------------------------------------------------------------ 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})     