import express = require("express");
import IServiceBase = require("./../../domainservice/IServiceBase.ts");
import ServiceBase = require("./../../domainservice/ServiceBase.ts");
import IEnityModel = require("./../../domainmodel/IEntityModel");

import _ = require('underscore');
import strUtility = require('underscore.string');

class ControllerBase<T extends IEnityModel>{
    private _service: IServiceBase<T>;
    constructor(service) {
        this._service = service;
    }

    protected isNullOrEmpty(entity:any):boolean{
        return _.isNull(entity) || _.isEmpty(entity) || _.isUndefined(entity);
    }
    create(req: express.Request, res: express.Response): void {
        try {
            var entity: T = <T>req.body;
            this._service.create(entity, (error, postEntity:IEnityModel) => {
                if (error) {
                    res.send({ "error": error.message });
                }
                else {
                    res.send({
                        "success": "success",
                        "entity": postEntity
                    });
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
            if (Object.keys(item).length === 0 && item.constructor === Object) {
                res.json({ "error": "body can't be null or empty", "statescode": 500 });
                return;
            }

            this._service.update(entityId, item, (error, result) => {
                if (error) {
                    res.send({ "error": error.message });
                }
                else {
                    res.send({
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
    remove(req: express.Request, res: express.Response): void {
        try {
            var entityId: string = req.params.id;

            this._service.remove(entityId, (error, result) => {
                if (error) {
                    res.send({ "error": error.message });
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
            this._service.findById(entityId, (error:any, result:any) => {
                if (error) {
                    console.log(error);
                    res.send({ "error": error.message });
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": e});

        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {

            this._service.retrieve((error, result) => {
                if (error) res.send({ "error": error });
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