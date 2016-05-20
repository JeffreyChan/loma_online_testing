import express = require("express");
import IServiceBase = require("./../../../domainservice/IServiceBase.ts");
import ServiceBase = require("./../../../domainservice/ServiceBase.ts");
import IEnityModel = require("./../../../domainmodel/IEntityModel");

class ControllerBase<T extends IEnityModel>{
    private _service: IServiceBase<T>;
    constructor(service) {
        this._service = service;
    }

    create(req: express.Request, res: express.Response): void {
        try {
            var item: T = <T>req.body;
            this._service.create(item, (error, result) => {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    res.send({ "success": "success" });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var entityId: string = req.params.id;            
            var item: T = <T>req.body;
            if(Object.keys(item).length === 0 && item.constructor === Object){
                res.json({ "error": "body can't be null or empty","statescode":500 });
                return;
            }
           
            this._service.update(entityId, item, (error, result) => {
                if (error) {
                    res.send({ "error": error });
                }
                else {
                    res.send({ "success": "success" });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    remove(req: express.Request, res: express.Response): void {
        try {
            var entityId: string = req.params.id;

            this._service.remove(entityId, (error, result) => {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    res.send({ "success": "success" });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {

            var entityId: string = req.params.id;

            this._service.findById(entityId, (error, result) => {
                if (error) {
                    res.send({ "error": error });
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {

            this._service.retrieve((error, result) => {
                if (error) res.send({ "error": "error" });
                else res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }
}

export = ControllerBase;  