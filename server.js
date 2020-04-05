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
    //adds an id based on counter
    Object.assign(body, {id: idNum});
    //adds to db
    db.push(body);
    //stringify db for writefile
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

app.delete("/api/notes:id", function(req, res) {

  const id = req.params.id;
  // const body = req.body;

  for (i = 0; i < db.length; i++) {
    if (id === db[i].id) {

      const indexOfObject = db.map(function(item) { return item.id; }).indexOf(i);
      const removed = db.splice(indexOfObject, 1);
      // tableData.push(req.body);
      console.log(indexOfObject);
      console.log(removed);
      res.send(`Note ${id} has been removed.`)
    }
    else {
      res.status(404).send('Note not found')
    }
}

});


// app.get("/api/notes/:id", function(req, res) {
//   const noteid = req.params.id;

//    fs.readFile("./db/db.json", function(err, data) {
//     if (err) {
//         console.log(err);
//       res.status(500);
//       return res.send("That is not a working title.");
//     }
//     const notesArray = JSON.parse(data);

//     for (var i = 0; i < notesArray.length; i++) {
//       if (noteId === notesArray[i].title) {
//         return res.json(notesArray[i]);
//       } else {
//         res.status(404);
//         return res.send("Can't find that note. Please try again.");
//     }
//   }
// });
// });

// Route to serve index.html
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on http://localhost:" + PORT);
});
