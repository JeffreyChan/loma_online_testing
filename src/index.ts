/// <reference path="./../typings/tsd.d.ts" />

import express = require("express");
import path = require("path");
import Middlewares = require("./app_api/middlewares/MiddlewaresBase");

var app = express();
var port = parseInt(process.env.PORT, 10) || 3000;
app.set("port", port);
app.use(express.static(path.join(__dirname, 'public')));

app.use(Middlewares.configuration);

app.use((req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(port, () => {
    console.log("Node app is running at localhost:" + port);
});

