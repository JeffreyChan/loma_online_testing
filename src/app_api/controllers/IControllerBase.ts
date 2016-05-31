import express = require("express");
import IEntityModel = require("./../../domainmodel/IEntityModel");

interface IControllerBase<T extends IEntityModel> {
    retrieve: express.RequestHandler;
    findById: express.RequestHandler;
    
    create: express.RequestHandler;
    update: express.RequestHandler;
    remove: express.RequestHandler;
}
export = IControllerBase;