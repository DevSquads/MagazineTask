const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
var app = express();

//Configuring express server
app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
  host: "LocalHost",
  user: "root",
  password: "dina1234",
  database: "MagazineDB",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Get All Articles
app.get("/articles", (req, res) => {
  mysqlConnection.query("SELECT * FROM article", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an Article
app.get("/articles/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM article WHERE ArtId = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Create an Article
app.post("/articles", (req, res) => {
  let art = req.body;
  var sql =
    "SET @ArtId = ?;SET @Title = ?;SET @Description = ?;SET @AuthorName = ?; \
    CALL ArticleAddOrEdit(@ArtId,@Title,@Description,@AuthorName);";
  mysqlConnection.query(
    sql,
    [art.ArtId, art.Title, art.Description, art.AuthorName],
    (err, rows, fields) => {
      if (!err)
        rows.forEach((element) => {
          if (element.constructor == Array)
            res.send("New Article Id: " + element[0].ArtId);
        });
      else console.log(err);
    }
  );
});

//Delete an Article
app.delete("/articles/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM article WHERE ArtId = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Deleted Successfully.");
      else console.log(err);
    }
  );
});

//Update an Article
app.put("/articles", (req, res) => {
  let art = req.body;
  var sql =
    "SET @ArtId = ?;SET @Title = ?;SET @Description = ?;SET @AuthorName = ?; \
    CALL ArticleAddOrEdit(@ArtId,@Title,@Description,@AuthorName);";
  mysqlConnection.query(
    sql,
    [art.ArtId, art.Title, art.Description, art.AuthorName],
    (err, rows, fields) => {
      if (!err) res.send("Article Details Updated Successfully");
      else console.log(err);
    }
  );
});
