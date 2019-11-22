/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
// const router  = express.Router({mergeParams : true});
const bcrypt = require("bcrypt");
module.exports = db => {
  router.get("/", (req, res) => {
    // view all maps
    db.query(`SELECT * FROM maps;`)
      .then(data => {
        const maps = data.rows;
        let tempVars = {
          maps
        };
        //res.json({ maps });
        res.render("index", tempVars);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/maps.json", (req, res) => {
    let query = `SELECT * FROM maps;`;
    db.query(query)
      .then(data => {
        const maps = data.rows;
        res.json(maps);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Get all users
  db.query(`SELECT * FROM users;`)
    .then(data => {
      const users = data.rows;
      res.json({ users });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
  // Get a user by id
  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM users WHERE id = $1, [${req.params.id}]`)
      .then(data => {
        const user = data.rows[0];
        res.json({ user });
      })

      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  //Get favorite maps by id

  // Post a new user
  // router.post("/", (req, res) => {
  //   db.query(
  //     `INSERT INTO users (username, password)
  //   VALUES ($1, $2)`,
  //     [`${req.body.username}`, `${req.body.password}`]
  //   )
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })

  //     .catch(err => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });
  return router;
};
