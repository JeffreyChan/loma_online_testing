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
}

Object.seal(CategoryController);
export = CategoryController;  