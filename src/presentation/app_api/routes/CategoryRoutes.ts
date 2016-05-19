import express = require("express");
import CategoryController = require("./.././controllers/CategoryController");

var router = express.Router();
class CategoryRoutes {
    private _controller: CategoryController;
    
    constructor () {
        this._controller = new CategoryController();   
    }
    get routes () {
       
        router.post("/category", this._controller.create);
        router.get("/category/:id", this._controller.findById);
/*         router.get("/heroes", this._controller.retrieve);
        router.put("/heroes/:_id", this._controller.update);
        
        router.delete("/heroes/:_id", this._controller.delete);*/
        
        return router;
    }
    
    
}

Object.seal(CategoryRoutes);
export = CategoryRoutes;