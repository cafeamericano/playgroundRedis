//Require ////////////////////////////////////////////////////////////

//Express
var express = require("express");
var app = express();

//Redis
var redis = require("redis");
var client = redis.createClient();

//Routes ////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("yay!");
});

//Pull first name
app.get("/firstname", (req, res) => {
  client.get("firstName", function(err, reply) {
    res.send(reply);
  });
});

//Pull value from string
app.get("/:search_key", (req, res) => {
  client.get(req.params.search_key, function(err, reply) {
    res.send(reply);
  });
});

//Pull keys and values from hash
app.get("/username/:search_key", (req, res) => {
  client.hgetall("username:" + req.params.search_key, function(err, reply) {
    res.json(reply);
  });
});

//Pull keys and values from hash
app.get(
  "/newhash/:username/:firstname/:lastname/:favoritecolor",
  (req, res) => {
    console.log("route hit for adding new hash");
    let query = [
      `username:${req.params.username}`,
      `firstname`,
      `${req.params.firstname}`,
      `lastname`,
      `${req.params.lastname}`,
      `favoritecolor`,
      `${req.params.favoritecolor}`
    ];
    console.log(query);
    client.hmset(query, function(err, reply) {
      res.send(reply);
    });
  }
);

//Start Server ////////////////////////////////////////////////////////////
app.listen(5051, () => console.log(`Listening on Port 5051.`));
