/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
// const router  = express.Router(mergeParams : true);

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/:id", (req, res) => {
    console.log(req.params);
    db.query(`SELECT * FROM users WHERE id = ${req.params.id};`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    console.log(req.body);

    db.query(`INSERT INTO users (id, username, password)
     VALUES ( ${req.body.id}, ${req.body.username}, ${req.body.password});`)
    //  VALUES ( ${req.body.id}, ${req.body.username}, ${req.body.password}) RETURNING *;`)
      .then(data => {
        console.log('hitting', data)
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
  
};
