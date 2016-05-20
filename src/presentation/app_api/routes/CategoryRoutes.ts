import express = require("express");
import CategoryController = require("./.././controllers/CategoryController");

var router = express.Router();
class CategoryRoutes {
    private _controller: CategoryController;

    constructor() {
        this._controller = new CategoryController();
    }
    get routes() {
        
        router.get("/category/:id", this._controller.findById.bind(this._controller));
        router.get("/category", this._controller.retrieve.bind(this._controller));
        router.post("/category", this._controller.create.bind(this._controller));
        router.put("/category/:id", this._controller.update.bind(this._controller));
        router.delete("/category/:id", this._controller.remove.bind(this._controller));

        return router;
    }
}

Object.seal(CategoryRoutes);
export = CategoryRoutes;