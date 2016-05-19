import express = require("express");
import IEnityModel = require("./../../../domainmodel/IEntityModel");

interface IControllerBase<T extends IEnityModel> {
    /*retrieve: express.RequestHandler;
    */
    findById: express.RequestHandler;
    create: express.RequestHandler;
    /*update: express.RequestHandler;
    delete: express.RequestHandler;*/
}
export = IControllerBase;