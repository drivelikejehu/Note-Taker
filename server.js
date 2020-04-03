const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to serve notes.html
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Route to serve index.html
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// const jsonDb = fs.readFileSync("./db/db.json");
// const jsonData = JSON.parse(jsonDb);
// console.log(jsonData);


app.get("/api/notes", function(req, res) {
  res.json();
});

app.get("/api/notes", function(req, res) {
  // res.json(tables);
});

app.get("/api/characters/:id", function(req, res) {
  // var chosen = req.params.id;

  // console.log(chosen);

  // for (var i = 0; i < characters.length; i++) {
  //   if (chosen === characters[i].routeName) {
  //     return res.json(characters[i]);
  //   }
  // }

  // return res.json(false);
});



app.listen(PORT, function() {
  console.log("App listening on http://localhost:" + PORT);
});
