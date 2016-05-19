import express = require("express");
import IServiceBase = require("./../../../domainservice/IServiceBase.ts");

class ControllerBase<T>{
    protected _service: IServiceBase<T>;

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

            var _id: string = req.params._id;
            this._service.findById(_id, (error, result) => {
                if (error) {
                    res.send({ "error": "error" });
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