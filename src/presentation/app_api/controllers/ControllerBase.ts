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

    findById(req: express.Request, res: express.Response): void {
        try {
            
            var catId: string = req.params.id;
            console.log("test here:");
            console.log(JSON.stringify(this));
            this._service.findById(catId, (error, result) => {
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
}

export = ControllerBase;  