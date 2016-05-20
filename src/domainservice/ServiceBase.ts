import mongoose = require("mongoose");
import IRepositoryBase = require("./../datagateway/repository/IRepositoryBase");
import IEnityModel = require("./../domainmodel/IEntityModel");

class ServiceBase<T extends IEnityModel> {
    private _repository: IRepositoryBase<T>;

    constructor(repository: IRepositoryBase<T>) {
        this._repository = repository;
    }

    create(item: T, callback: (error: any, result: any) => void) {
        this._repository.create(item, callback);
    }

    retrieve(callback: (error: any, result: any) => void) {
        this._repository.retrieve(callback);
    }

    update(id: string, item: any, callback: (error: any, result: any) => void) {

        this._repository.findById(id, (err, res) => {
            if (err) {
                callback(err, res);
            }
            else {
                if (!res) {
                    var msg = {
                        error: "can't find category by id:".concat(id),
                        statescode: 404
                    };
                    callback(msg, null);
                }
                else {
                    this._repository.update(res._id, item, callback);
                }
            }
        });
    }

    remove(id: string, callback: (error: any, result: any) => void) {
        this._repository.findById(id, (err, res) => {
            if (err) {
                callback(err, res);
            }
            else {
                if (!res) {
                    var msg = {
                        error: "can't find category by id:".concat(id),
                        statescode: 404
                    };
                    callback(msg, null);
                }
                else {
                    this._repository.remove(id, callback);
                }
            }
        });

    }

    findById(id: string, callback: (error: any, result: any) => void) {
        this._repository.findById(id, callback);
    }
}

export = ServiceBase;