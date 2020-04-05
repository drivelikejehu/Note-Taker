const fs = require("fs");

module.exports = function(app) {

  //counter for id
  let i = 1;
  let db = [];


  //reads the database and returns all saved notes as json
  app.get("/api/notes", function(req, res) {

    try {
      db = fs.readFileSync("db/db.json", "utf8");
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

  //receives new note to save, adds an id, 
  //adds to db, and returns the note
  //increment counter for next note
  app.post("/api/notes", function(req, res) {

    try {
      db = fs.readFileSync("db/db.json", "utf8");
      db = JSON.parse(db);
      const body = req.body;
      Object.assign(body, {id: i});
      db.push(body);
      
      res.send(db);
      i++;
  
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
  
};

// var obj = {key1: "value1", key2: "value2"};
// Object.assign(obj, {key3: "value3"});

// document.body.innerHTML = JSON.stringify(obj);

// we have an array of objects, we want to remove one object using only the id property
// var apps = [{id:34,name:'My App',another:'thing'},{id:37,name:'My New App',another:'things'}];

// get index of object with id:37
// var removeIndex = apps.map(function(item) { return item.id; }).indexOf(37);

// remove object
// apps.splice(removeIndex, 1);