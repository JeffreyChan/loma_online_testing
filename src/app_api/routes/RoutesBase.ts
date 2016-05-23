import express = require("express");
import CategoryRoutes = require("./CategoryRoutes");
import QuestionRoutes = require("./QuestionRoutes");

var app = express();
class RoutesBase {

    get routes() {
        app.use("/api", new QuestionRoutes().routes);
        app.use("/api", new CategoryRoutes().routes);
        
        return app;
    }
}
export = RoutesBase;