/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = db => {
  // Get all maps
  router.get("/", (req, res) => {
    let query = `SELECT * FROM maps`;
    console.log(query);
    db.query(query)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Get a map by id
  router.get("/:id", (req, res) => {
    let query = `SELECT * FROM maps WHERE id = ${req.params.id} `;
    console.log(query);
    db.query(query)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Add a map
  router.post("/", (req, res) => {
    let rb = req.body;
    console.log(rb);
    let query = `INSERT INTO maps(title, description, longitude, latitude, owner_id)
    VALUES( ${rb.title}, ${rb.description}, ${rb.longitude}, ${rb.latitude}, ${rb.owner_id} )`;
    console.log(query);
    db.query(query)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Edit a map
  router.put("/:id", (req, res) => {
    let rb = req.body;
    console.log(rb);
    let query = `UPDATE maps SET (title, description, longitude, latitude, owner_id)
    = (${rb.title}, ${rb.description}, ${rb.longitude}, ${rb.latitude}, ${rb.owner_id} ) 
    WHERE id = ${rb.id} `;
    console.log(query);
    db.query(query)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Delete a map
  router.delete("/:id", (req, res) => {
    let query = `DELETE FROM maps WHERE id = ${req.params.id} `;
    console.log(query);
    db.query(query)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
