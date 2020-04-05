const db = require("../db/db");

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    res.json(db);
  });

  app.post("/api/notes", function(req, res) {
    if (data) {
      db.push(req.body);
      res.json(true);
    }
    else {
      res.json(false);
    }
  });
  
  app.delete("/api/notes:id", function(req, res) {

    const title = req.params.id;
  
    for (i = 0; i < db.length; i++) {
      if (title === db([i].title)) {
        tableData.push(req.body);
        
        res.json({ ok: true });
      }
      else {
        res.status(404).send('Note not found')
      }
  }
  
  });
  
};