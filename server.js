//Express
var express = require("express");
var app = express();

//Redis
var redis = require("redis");
var client = redis.createClient();

//Routes
app.get("/", (req, res) => {
  res.send("yay!");
});

app.get("/firstname", (req, res) => {
  client.get("firstName", function(err, reply) {
    res.send(reply)
  });
});

//Start server
app.listen(5050, () => console.log(`Listening on Port 5050.`));
