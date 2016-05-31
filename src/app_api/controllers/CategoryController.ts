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
        try {
            this._catService.getRootCategory((error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }
    
    getChildCategories(req: express.Request, res: express.Response): void {
        try {
            this._catService.getChildCategories((error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }

    getCategories(req: express.Request, res: express.Response): void {
        try {
            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            console.log(ip);
            console.log(req.headers['x-forwarded-for']);
            console.log(req.connection.remoteAddress);
            let page = parseInt(req.query.page) || 1;
            let size = parseInt(req.query.size) || 10;
            this._catService.getCategories(page, size, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }
    createCategory(req: express.Request, res: express.Response): void {
        try {
            var item: ICategoryModel = <ICategoryModel>req.body;

            this._catService.createCategory(item, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }

    removeCategory(req: express.Request, res: express.Response): void {
        try {
            var entityId: string = req.params.id;

            this._catService.removeCategory(entityId, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }

    updateCategory(req: express.Request, res: express.Response): void {
        try {
            var entityId: string = req.params.id;
            var item: ICategoryModel = <ICategoryModel>req.body;
            item._id = entityId;
            this._catService.updateCategory(item, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }
}

Object.seal(CategoryController);
export = CategoryController;  