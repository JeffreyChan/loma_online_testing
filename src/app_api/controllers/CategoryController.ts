import express = require("express");
import ICategoryService = require("./../../domainservice/ICategoryService");
import ICategoryController = require("./ICategoryController");
import ICategoryModel = require("./../../domainmodel/ICategoryModel");

import ControllerBase = require("./ControllerBase");
import CategoryService = require("./../../domainservice/CategoryService");

class CategoryController extends ControllerBase<ICategoryModel> implements ICategoryController {
    private _catService: ICategoryService;

    constructor();
    constructor(catService: ICategoryService = new CategoryService()) {
        super(catService);
        this._catService = catService;
    }
    getRootCategory(req: express.Request, res: express.Response): void {

        res.json({
            "success": "success",
            "entity": "hello for test"
        });
        /*try {
            this._catService.getRootCategory(true, (error, result) => {
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
            res.send({ "error": e });

        }*/
    }
    createCategory(req: express.Request, res: express.Response): void {
        try {
            var item: ICategoryModel = <ICategoryModel>req.body;

            this._catService.createCategory(item, (error, result) => {
                if (error) {
                    res.json({ "error": error.message });
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
            res.send({ "error": e });

        }
    }

    removeCategory(req: express.Request, res: express.Response): void {
        try {
            var entityId: string = req.params.id;

            this._catService.removeCategory(entityId, (error, result) => {
                if (error) {
                    res.json({ "error": error.message });
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
            res.send({ "error": e });

        }
    }
}

Object.seal(CategoryController);
export = CategoryController;  