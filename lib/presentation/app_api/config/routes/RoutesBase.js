var express = require("express");

//import HeroRoutes = require("./HeroRoutes");
//import SpartanRoutes = require("./SpartanRoutes");
var app = express();
var RoutesBase = (function () {
    function RoutesBase() {
    }
    Object.defineProperty(RoutesBase.prototype, "routes", {
        get: function () {
            /* app.use("/api", new HeroRoutes().routes);
            app.use("/api", new SpartanRoutes().routes);*/
            return app;
        },
        enumerable: true,
        configurable: true
    });
    return RoutesBase;
})();
module.exports = RoutesBase;
