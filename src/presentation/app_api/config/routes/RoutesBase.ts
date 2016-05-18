import express = require("express");
//import HeroRoutes = require("./HeroRoutes");
//import SpartanRoutes = require("./SpartanRoutes");
var app = express();
class RoutesBase {
    
    get routes() {
       /* app.use("/api", new HeroRoutes().routes);
        app.use("/api", new SpartanRoutes().routes);*/
        return app;
    }
}
export = RoutesBase;