const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Route to serve notes.html
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// read the `db.json` file and return all saved notes as JSON
app.get("/api/notes", function(req, res) {
  res.json(db);
});

app.post("/api/notes", function(req, res) {
  try {
    let idNum = db.length;
    // console.log(idNum);

    //receives new note to save and sets to const
    const body = req.body;
    //adds an id based on amount of objects
    Object.assign(body, {id: idNum});
    //adds to db
    db.push(body);
    //stringify db to write the file
    dbString = JSON.stringify(db);
    
    fs.writeFile("db/db.json", dbString, "utf8", function(err) {
      // error handling
      if (err) throw err;
    });
    
    res.json(body);

    // error handling
  } catch (err) {
    console.log("You have an error");
    console.log(err);
  }
  
});

app.delete("/api/notes/:id", function(req, res) {
  try {
    const id = req.params.id;
    //  reads the json file
    var notes = fs.readFileSync("./db/db.json", "utf8");
    // parse the data to get an array of the objects
    notes = JSON.parse(notes);
    // delete the old note from the array on note objects
    notes = notes.filter(function(note) {
      return note.id != id;
    });
    //stringify db to write the file
    const notesString = JSON.stringify(notes);
    // write the new notes to the file
    fs.writeFile("./db/db.json", notesString, "utf8", function(err) {
      // error handling
      if (err) throw err;
    });

      res.json(notes);

    // error handling
  } catch (err) {
    throw err;
    console.log(err);
  }
});

// Route to serve index.html
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on http://localhost:" + PORT);
});
