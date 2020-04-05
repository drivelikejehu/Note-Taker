const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Route to serve notes.html
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Route to serve index.html
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// read the `db.json` file and return all saved notes as JSON
app.get("/api/notes", function(req, res) {
  try {
    let db = fs.readFileSync("db/db.json", "utf8");
    console.log(db);
    // parse it so database is an array of objects
    db = JSON.parse(db);
    console.log(db);

    // error handling
  } catch (err) {
    console.log("You have an error");
    console.log(err);
  }
  //   send objects to the browser
  res.json(db);
});

app.post("/api/notes", function(req, res) {

  try {
    
    let dbParsed = JSON.parse(db);
    let idNum = db.length;
    console.log(idNum);

    //receives new note to save and sets to const
    const body = req.body;
    //adds an id based on counter
    Object.assign(body, {id: idNum});
    //adds to db
    db.push(body);
    //stringify db for writefile
    dbString = JSON.stringify(dbParsed);
    
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


app.get("/api/notes/:id", function(req, res) {
  const noteid = req.params.id;

   fs.readFile("./db/db.json", function(err, data) {
    if (err) {
        console.log(err);
      res.status(500);
      return res.send("That is not a working title.");
    }
    const notesArray = JSON.parse(data);

    for (var i = 0; i < notesArray.length; i++) {
      if (noteId === notesArray[i].title) {
        return res.json(notesArray[i]);
      } else {
        res.status(404);
        return res.send("Can't find that note. Please try again.");
    }
  }
});
});

app.listen(PORT, function() {
  console.log("App listening on http://localhost:" + PORT);
});
