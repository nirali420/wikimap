// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const database = require("./routes/database");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"]
  })
);

app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const indexRoutes = require("./routes/index");
const colabRoutes = require("./routes/colab");
const favRoutes = require("./routes/fav");
const userRoutes = require("./routes/users");
const mapsRoutes = require("./routes/maps");
const markersRoutes = require("./routes/markers");
// const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", indexRoutes(db));
app.use("/colab", colabRoutes(db));
app.use("/fav", favRoutes(db));
app.use("/api/users", userRoutes(db));
app.use("/api/maps", mapsRoutes(db));
app.use("/api/markers", markersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  let templateVars = {
    user: req.session.userId
  };
  res.render("index", templateVars);
  // res.render("index");
});
app.get("/user_index", (req, res) => {
  // let templateVars = {
  //   user: req.session.userId
  // };
  res.render("user_index");
});
// Display index page
app.get("/index", (req, res) => {
  let templateVars = {
    user: undefined
  };
  res.render("index", templateVars);
});
/// Authentication
/**
 * Check if a user exists with a given username and password
 * @param {String} username
 * @param {String} password encrypted
 */
const login = function(username, password) {
  return database.getUser(username).then(user => {
    if (password === user.password) {
      console.log("user authenticated");
      return user;
    }
    console.log("user not authenticated");
    return null;
  });
};
exports.login = login;
app.post("/", (req, res) => {
  const { username, password } = req.body;
  login(username, password)
    .then(user => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      console.log("user logged in? ", user);
      req.session.userId = user;
      res.redirect("user_index");
    })
    .catch(e => res.send(e));
});
app.post("/logout", (req, res) => {
  req.session.userId = null;
  res.redirect(302, "/");
  // res.send({});
});

//Renders to fullpage mapview for visitor
app.get("/maps/:id", (req, res) => {
  res.render("visitor_mapview", req.params);
});

// Renders to fullpage mapview of collaboration for user
app.get("/colab/:id", (req, res) => {
  res.render("user_mapview", req.params);
});

// Renders to fullpage mapview of favorite for user
app.get("/fav/:id", (req, res) => {
  res.render("user_mapview", req.params);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
