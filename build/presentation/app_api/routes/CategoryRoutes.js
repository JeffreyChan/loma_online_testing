var express = require("express");
var CategoryController = require("./.././controllers/CategoryController");

var router = express.Router();
var CategoryRoutes = (function () {
    function CategoryRoutes() {
        this._controller = new CategoryController();
    }
    Object.defineProperty(CategoryRoutes.prototype, "routes", {
        get: function () {
            router.post("/category", this._controller.create);
            router.get("/category/:id", this._controller.findById);

            /*         router.get("/heroes", this._controller.retrieve);
            router.put("/heroes/:_id", this._controller.update);
            
            router.delete("/heroes/:_id", this._controller.delete);*/
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return CategoryRoutes;
})();

Object.seal(CategoryRoutes);
module.exports = CategoryRoutes;
