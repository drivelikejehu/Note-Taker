const express = require("express");
const path = require("path");

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


// app.get("/api/tables", function(req, res) {
//   res.json(tables);
// });


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
