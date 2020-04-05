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
  
  // app.post("/api/notes:id", function(req, res) {
  //   if (tableData.length < 5) {
  //     tableData.push(req.body);
  //     res.json(true);
  //   }
  //   else {
  //     waitListData.push(req.body);
  //     res.json(false);
  //   }
  // });
  
};