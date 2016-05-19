/// <reference path="./../typings/tsd.d.ts" />
var express = require("express");
var Middlewares = require("./presentation/app_api/config/middlewares/MiddlewaresBase");

var app = express();
var port = parseInt(process.env.PORT, 10) || 3000;
app.set("port", port);
app.use(Middlewares.configuration);

app.listen(port, function () {
    console.log("Node app is running at localhost:" + port);
});
