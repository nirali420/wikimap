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
    let query = `SELECT collaborations.*, maps.title, maps.description, maps.longitude, maps.latitude, maps.location, maps.owner_id FROM collaborations                
JOIN maps ON collaborations.map_id = maps.id
		;`;
    console.log(query);
    db.query(query)
      .then(data => {
        const colabs = data.rows;
        let tempVars = {
          colabs
        };
        //res.json({ maps });
        // console.log(tempVars);
        res.render("user_colab", tempVars);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/colabs.json", (req, res) => {
    let query = `SELECT collaborations.*, maps.title, maps.description, maps.longitude, maps.latitude, maps.location, maps.owner_id FROM collaborations                
JOIN maps ON collaborations.map_id = maps.id
		;`;
    db.query(query)
      .then(data => {
        const colabs = data.rows;
        res.json(colabs);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
