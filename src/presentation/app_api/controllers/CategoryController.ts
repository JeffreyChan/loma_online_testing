import express = require("express");

import ICategoryService = require("./../../../domainservice/ICategoryService");
import ICategoryController = require("./ICategoryController");
import ICategoryModel = require("./../../../domainmodel/ICategoryModel");

import ControllerBase = require("./ControllerBase");
import CategoryService = require("./../../../domainservice/CategoryService");

class CategoryController extends ControllerBase<ICategoryModel> implements ICategoryController {
    private _catService: ICategoryService;

    constructor();
    constructor(catService: ICategoryService = new CategoryService()) {
        super(catService);
        this._catService = catService;
    }
    getRootCategory(req: express.Request, res: express.Response): void{
        
        
    }
    createCategory(req: express.Request, res: express.Response): void {
        try {
            var item: ICategoryModel = <ICategoryModel>req.body;
            
            this._catService.createCategory(item, (error, result) => {
                if (error) {
                    res.json({ "error": error });
                }
                else {
                    res.json({
                        "success": "success",
                        "entity": result
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
}

Object.seal(CategoryController);
export = CategoryController;  