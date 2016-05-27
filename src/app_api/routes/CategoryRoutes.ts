import express = require("express");
import ICategoryController = require("./.././controllers/ICategoryController");
import CategoryController = require("./.././controllers/CategoryController");

var router = express.Router();
class CategoryRoutes {
    private _controller: ICategoryController;

    constructor() {
        this._controller = new CategoryController();
    }
    get routes() {

        router.get("/category/root/", this._controller.getRootCategory.bind(this._controller));
        router.get("/category/:id", this._controller.findById.bind(this._controller));

        router.get("/category", this._controller.getCategories.bind(this._controller));
        router.post("/category", this._controller.createCategory.bind(this._controller));
        router.put("/category/:id", this._controller.updateCategory.bind(this._controller));
        router.delete("/category/:id", this._controller.removeCategory.bind(this._controller));

        return router;
    }
}

Object.seal(CategoryRoutes);
export = CategoryRoutes;