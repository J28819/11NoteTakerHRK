const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
var fs = require('fs');
var textData = require('./public/db/db.json');
const { text } = require('express');



app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.use('/css', express.static(path.join(__dirname, 'public/assets/css')))
app.use('/js', express.static(path.join(__dirname, 'public/assets/js')))
app.use('/json', express.static(path.join(__dirname, 'public/assets/json')))
app.use('/img', express.static(path.join(__dirname, 'public/assets/img')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  })

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  })

  // Route to read json file
app.get('/api/notes', (req, res) =>{
   res.json(textData)
});


//Route to handle Add Notes
app.post('/api/notes', (req, res) =>{
   let uuid  = Math.floor( (1 + Math. random()) * 0x10000).toString(16).substring(1);
   req.body.id = uuid;
   let newNote = req.body;
   textData.push(newNote);
   console.log("New Note added")
   const savedNotes = JSON.parse(fs.readFileSync("./public/db/db.json", "utf8"));
   savedNotes.push(newNote);
   fs.writeFileSync("./public/db/db.json", JSON.stringify(savedNotes));
   res.status(200).json({added: true});
 
});

//Route to Delete Notes
app.delete('/api/notes/:id', (req, res) =>{
  console.log("Request Delete")
  console.log(req.params.id)
  const savedNotes = JSON.parse(fs.readFileSync("./public/db/db.json", "utf8"));
  var UpdateNotes = savedNotes.filter(function(e) { return e.id !== req.params.id })
  console.log(UpdateNotes)
  fs.writeFileSync("./public/db/db.json", JSON.stringify(UpdateNotes));
  textData = UpdateNotes
  res.json(UpdateNotes);

});


  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })