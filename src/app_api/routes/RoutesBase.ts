import express = require("express");
import CategoryRoutes = require("./CategoryRoutes");
import QuestionRoutes = require("./QuestionRoutes");
import ExamRoutes = require("./ExamRoutes");

var app = express();
class RoutesBase {
    
    get routes() {
        app.use("/api", new QuestionRoutes().routes);
        app.use("/api", new CategoryRoutes().routes);
        app.use("/api", new ExamRoutes().routes);
        
        return app;
    }
}
export = RoutesBase;