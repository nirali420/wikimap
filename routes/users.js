/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
// const router  = express.Router(mergeParams : true);

const bcrypt = require('bcrypt');

module.exports = (db, database) => {
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


/// Authentication

  /**
   * Check if a user exists with a given username and password
   * @param {String} username
   * @param {String} password encrypted
   */
  const login =  function(username, password) {
    // return database.getUserWithEmail(email)
    // console.log(username);
    return database.getUserWithEmail(username)
    .then(user => {
      // console.log("password: ", user.password);
      user.password = bcrypt.hashSync(user.password, 12);
      if (bcrypt.compareSync(password, user.password)) {
        console.log(user);
        return user;
      }
      console.log ("not found");
      return null;
    });
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    const {username, password} = req.body;
    login(username, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        // res.send(user);
        req.session.userId = user.id;
        // res.send({user: {id: user.id, username: user.name, password: user.password }});
      })
      .catch(e => res.send(e));
  });
  
  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.send({});
  });


  return router;
  
};
