const sql = require("./db.js");

// constructor
const Secret = function(tutorial) {
  this.secretKey = tutorial.secretKey;

};

Secret.create = (newTutorial, result) => {
  sql.query("INSERT INTO secrets SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created secret: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

Secret.findById = (id, result) => {
  sql.query(`SELECT * FROM secrets WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found secrets: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Secret.getAll = (title, result) => {
  let query = "SELECT * FROM secrets";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("secrets: ", res);
    result(null, res);
  });
};

Secret.getAllPublished = result => {
  sql.query("SELECT * FROM secrets WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("secrets: ", res);
    result(null, res);
  });
};

Secret.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE secrets SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated secrets: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Secret.remove = (id, result) => {
  sql.query("DELETE FROM secrets WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted secrets with id: ", id);
    result(null, res);
  });
};

Secret.removeAll = result => {
  sql.query("DELETE FROM secrets", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} secrets`);
    result(null, res);
  });
};

module.exports = Secret;
