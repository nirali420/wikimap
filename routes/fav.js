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
    let query = `SELECT favorites.*, maps.title, maps.description, maps.longitude, maps.latitude, maps.location, maps.owner_id FROM favorites
JOIN maps ON favorites.map_id = maps.id
		;`;
    console.log(query);
    db.query(query)
      .then(data => {
        const favs = data.rows;
        let tempVars = {
          favs
        };
        //res.json({ maps });
        // console.log(tempVars);
        res.render("user_fav", tempVars);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/favs.json", (req, res) => {
    let query = `SELECT favorites.*, maps.title, maps.description, maps.longitude, maps.latitude, maps.location, maps.owner_id FROM favorites
JOIN maps ON favorites.map_id = maps.id
		;`;
    db.query(query)
      .then(data => {
        const favs = data.rows;
        res.json(favs);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
