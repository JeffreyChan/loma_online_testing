var express = require("express");
var CategoryRoutes = require("./CategoryRoutes");

var app = express();
var RoutesBase = (function () {
    function RoutesBase() {
    }
    Object.defineProperty(RoutesBase.prototype, "routes", {
        get: function () {
            app.use("/api", new CategoryRoutes().routes);
            return app;
        },
        enumerable: true,
        configurable: true
    });
    return RoutesBase;
})();
module.exports = RoutesBase;
