import Promise = require('bluebird');
import mongoose = require("mongoose");
import IRepositoryBase = require("./../datagateway/repository/IRepositoryBase");
import IEntityModel = require("./../domainmodel/IEntityModel");
import Utilities = require("./../domainmodel/Utilities");

class ServiceBase<T extends IEntityModel> {
    private _repository: IRepositoryBase<T>;

    constructor(repository: IRepositoryBase<T>) {
        this._repository = repository;
    }

    create(item: T, callback: (error: any, result: any) => void) {
        Promise.resolve(this._repository.create(item))
            .then((postEntity: IEntityModel) => {
                callback(null, postEntity);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    retrieve(callback: (error: any, result: any) => void) {
        Promise.resolve(this._repository.retrieve({}))
            .then((itemList: IEntityModel[]) => {
                callback(null, itemList);
            }).then(null, (error: any) => {
                callback(error, null);
            });
    }

    update(id: string, item: any, callback: (error: any, result: any) => void) {
        Promise.resolve(this._repository.findById(id))
            .then((entity: IEntityModel) => {
                if (Utilities.isNullorEmpty(entity)) {
                    throw new Error("the entity can not find, please try other!");
                }
                return this._repository.update(id, item);

            })
            .then((entity: IEntityModel) => {
                callback(null, entity);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    remove(entityId: string, callback: (error: any, enitty: any) => void) {

        Promise.resolve(this._repository.findById(entityId))
            .then((entity: IEntityModel) => {
                if (Utilities.isNullorEmpty(entity)) {
                    throw new Error("the entity can not find, please try other!");
                }
                return this._repository.remove(entityId);
            })
            .then((entity: IEntityModel) => {
                callback(null, entity);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    findById(id: string, callback: (error: any, result: any) => void) {
        Promise.resolve(this._repository.findById(id))
            .then((entity: IEntityModel) => {
                if (Utilities.isNullorEmpty(entity)) {
                    throw new Error("the entity can not find, please try other!");
                }
                callback(null, entity);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }
}

export = ServiceBase;