import express = require("express");
import CategoryRoutes = require("./CategoryRoutes");

var app = express();
class RoutesBase {

    get routes() {
        app.use("/api", new CategoryRoutes().routes);
        return app;
    }
}
export = RoutesBase;