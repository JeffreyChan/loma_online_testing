import express = require("express");
import ICategoryModel = require("./../../domainmodel/ICategoryModel");
import IControllerBase = require("./IControllerBase");

interface ICategoryController extends IControllerBase<ICategoryModel> {
    createCategory: express.RequestHandler;
    getRootCategory: express.RequestHandler;
    removeCategory: express.RequestHandler;
    updateCategory: express.RequestHandler;
}
export = ICategoryController;  