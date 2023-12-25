const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log(req)
  res.send('Hello World!!!!')
})

app.get('/todo', (req, res) => {
    res.send('Hello todo')
  })

  app.get('/users', (req, res) => {
    res.send('Hello users')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})