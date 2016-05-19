import express = require("express");
import CategoryRoutes = require("./CategoryRoutes");

var app = express();
class RoutesBase {

    get routes() {
        console.log("hello there");
        app.use("/api", new CategoryRoutes().routes);
        return app;
    }
}
export = RoutesBase;