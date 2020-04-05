const db = require("../db/db");

module.exports = function(app) {

  //counter for id
  let i = 1;

  //reads the database and returns all saved notes as json
  app.get("/api/notes", function(req, res) {
    res.json(db);
  });
  //receives new note to save, adds an id, 
  //adds to db, and returns the note
  //increment counter for next note
  app.post("/api/notes", function(req, res) {
    
    const body = req.body;
    Object.assign(body, {id: i});
    db.push(body);
    res.send(body);
    i++;
  });
  
  app.delete("/api/notes:id", function(req, res) {

    const id = req.params.id;
    const body = req.body;
  
    for (i = 0; i < db.length; i++) {
      if (id === db[i].id) {
        tableData.push(req.body);

        res.json({ ok: true });
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