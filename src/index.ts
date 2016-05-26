/// <reference path="./../typings/tsd.d.ts" />

import express = require("express");
const cors = require('express-cors');
import Middlewares = require("./app_api/middlewares/MiddlewaresBase");

var app = express();
var port = parseInt(process.env.PORT, 10) || 2000;
app.set("port", port);
app.use(cors({
	allowedOrigins: [
		'http://localhost:3000', 'google.com'
	]
}))
app.use(Middlewares.configuration);

app.listen(port, () => {
    console.log("Node app is running at localhost:" + port);
});

