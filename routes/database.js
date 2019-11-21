// const properties = require("./json/properties.json");
// const users = require("./json/users.json");

const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm"
});

const getUser = function(username) {
  // console.log("username in getUserWithEmail: ", username);
  return pool
    .query(
      `
  SELECT *
  FROM users
  WHERE username = $1;`,
      [`${username}`]
    )
    .then(res => res.rows[0])
    .catch(err => null);
};
exports.getUser = getUser;
