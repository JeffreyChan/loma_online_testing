import express = require("express");

interface IControllerBase<T> {
    /*retrieve: express.RequestHandler;
    */
    findById: express.RequestHandler;
    create: express.RequestHandler;
    /*update: express.RequestHandler;
    delete: express.RequestHandler;*/
}
export = IControllerBase;