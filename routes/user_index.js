/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = db => {
  //Get all maps
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM maps;`)
      .then(data => {
        const maps = data.rows;
        let tempVars = {
          maps
        };
        //res.json({ maps });
        res.render("user_index", tempVars);
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
  return router;
};
