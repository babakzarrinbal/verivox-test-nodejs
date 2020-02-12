const express = require("express");
const http = require('http');

global.config = {};
config.env = require("./config/env");
var app = express();

// validating cors policy if config exists
if (config.env.cors) {
  app.use(function(req, res, next) {
    let origin = req.get("origin");

    if (
      (config.env.cors == "blacklist" &&
        config.env.cors.origins.includes(origin)) ||
      (config.env.cors == "whitelist" && !config.env.cors.origins.includes(origin))
    )
      return res.status(400).send({ message: "Cors Policy!!!" });
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    return next();
  });
}


const server = http.createServer(app);

// connecting to database, configuring cookies , sessions , etc ...
let routes = require('./routes')(app);


try {
  server.listen(config.env.port, config.env.host, function() {
    console.log(
      "Server turned on at ",
      "http://" + config.env.host + ":" + config.env.port
    );
  });
} catch (ex) {
  console.log(ex);
}
