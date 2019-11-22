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
    db.query(
      `SELECT favorites.*, maps.* FROM favorites
JOIN maps ON favorites.map_id = maps.id
WHERE favorites.user_id = ${req.session.user.id};`
    )
      .then(data => {
        const maps = data.rows;
        let tempVars = {
          user: req.session.user,
          maps
        };
        res.render("index", tempVars);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  //   router.get("/favs.json", (req, res) => {
  //     let query = `SELECT favorites.*, maps.title, maps.description, maps.longitude, maps.latitude, maps.location, maps.owner_id FROM favorites
  // JOIN maps ON favorites.map_id = maps.id
  // 		;`;
  //     db.query(query)
  //       .then(data => {
  //         const favs = data.rows;
  //         res.json(favs);
  //       })
  //       .catch(err => {
  //         res.status(500).json({ error: err.message });
  //       });
  //   });
  return router;
};
// `SELECT favorites.*, maps.title, maps.description, maps.longitude, maps.latitude, maps.location, maps.owner_id FROM favorites
// JOIN maps ON favorites.map_id = maps.id
// WHERE favorites.user_id = ${req.session.user}
// 		;`
