import express = require("express");
import IServiceBase = require("./../../domainservice/IServiceBase");
import ServiceBase = require("./../../domainservice/ServiceBase");
import IEntityModel = require("./../../domainmodel/IEntityModel");

import Utilities = require("./../../domainmodel/Utilities");


class ControllerBase<T extends IEntityModel>{
    private _service: IServiceBase<T>;
    constructor(service) {
        this._service = service;
    }

    protected handleResponse(res: express.Response, error: any, result: any): void {
        if (error) {
            res.statusCode = 400;
            if (error.errors) {
                res.json({ "error": error });
            } else {
                res.json({ "error": error.message });
            }
        }
        else {
            res.json({
                "success": "success",
                "entity": result
            });
        }
    }
    create(req: express.Request, res: express.Response): void {
        try {
            var entity: T = <T>req.body;
            if (Utilities.isNullorEmpty(entity)) {
                throw new Error("body can't be null or empty");
            }
            this._service.create(entity, (error, postEntity: IEntityModel) => {
                this.handleResponse(res, error, postEntity);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var entityId: string = req.params.id;
            var item: T = <T>req.body;
            if (Utilities.isNullorEmpty(item)) {
                throw new Error("body can't be null or empty");
            }

            this._service.update(entityId, item, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }
    remove(req: express.Request, res: express.Response): void {
        try {
            var entityId: string = req.params.id;

            if (Utilities.isNullorEmpty(entityId)) {
                throw new Error("entityId can not be empty!");
            }

            this._service.remove(entityId, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {
            var entityId: string = req.params.id;
            if (Utilities.isNullorEmpty(entityId)) {
                throw new Error("entityId can not be empty!");
            }
            
            this._service.findById(entityId, (error: any, result: any) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            this._service.retrieve((error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }
}

export = ControllerBase;  