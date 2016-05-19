import express = require("express");

import ICategoryService = require("./../../../domainservice/ICategoryService");
import ICategoryController = require("./ICategoryController");
import ICategoryModel = require("./../../../domainmodel/ICategoryModel");

import ControllerBase = require("./ControllerBase");
import CategoryService = require("./../../../domainservice/CategoryService");

class CategoryController extends ControllerBase<ICategoryModel> implements ICategoryController {
    
    constructor() {
        super(new CategoryService());
        
    } 
}

Object.seal(CategoryController);
export = CategoryController;  