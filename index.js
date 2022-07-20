const express = require('express');
var fs = require('fs');

const app = express();
const PORT = Process.env.PORT || 3001;
const path = require('path');
app.use(express.static('public'))


app.use('/css', express.static(path.join(__dirname, 'public/css')))
app.use('/js', express.static(path.join(__dirname, 'public/js')))
app.use('/json', express.static(path.join(__dirname, 'public/json')))
app.use('/img', express.static(path.join(__dirname, 'public/img')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  })


  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })