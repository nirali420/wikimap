/*
 * All routes for markers are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/maps/:id/markers", (req, res) => {
    console.log(req.params);
    let query = `SELECT * FROM markers
    JOIN maps on maps.id = map_id
    WHERE maps.id = ${req.params.id}`;
    console.log(query);
    db.query(query)
      .then(data => {
        const markers = data.rows;
        res.json({ markers });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/maps/:id1/markers/:id2", (req, res) => {
    console.log(req.params);
    let query = `SELECT * FROM markers
    JOIN maps on maps.id = map_id
    WHERE maps.id = ${req.params.id1}
    AND
    markers.id = ${req.params.id2}`;
    console.log(query);
    db.query(query)
      .then(data => {
        const markers = data.rows;
        res.json({ markers });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  
  router.post("/maps/:id/markers", (req, res) => {
    let rb = req.body;
    console.log(rb);
    let query = `INSERT INTO markers(id, title, description, image_url, longitude, latitude, owner_id, map_id )
    VALUES( ${rb.id}, ${rb.title}, ${rb.description}, ${rb.image_url}, ${rb.longitude}, ${rb.latitude}, ${rb.owner_id},  ${rb.map_id} )`;
    console.log(query);
    db.query(query)
      .then(data => {
        const markers = data.rows;
        res.json({ markers });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
