import mongoose = require("mongoose");
import IRepositoryBase = require("./../datagateway/repository/IRepositoryBase");
import IEnityModel = require("./../domainmodel/IEntityModel");

class ServiceBase<T extends IEnityModel> {
    private _repository: IRepositoryBase<T>;

    constructor(repository: IRepositoryBase<T>) {
        this._repository = repository;
    }

    create(item: T, callback: (error: any, result: any) => void) {
        this._repository.create(item).then((postEntity: IEnityModel) => {
            if (!postEntity) {
                throw new Error('can not find category');
            }
            callback(null, postEntity);
        }).then(null, (error: any) => {
            callback(error, null);
        });
    }

    retrieve(callback: (error: any, result: any) => void) {
        this._repository.retrieve({}).then((itemList: IEnityModel[]) => {
            callback(null, itemList);
        }).then(null, (error: any) => {
            callback(error, null);
        });
    }

    update(id: string, item: any, callback: (error: any, result: any) => void) {

        this._repository.update(id, item).then((entity: IEnityModel) => {
            if (!entity) {
                throw new Error('can not find category');
            }
            callback(null, entity);
        }).then(null, (error: any) => {
            callback(error, null);
        });
    }

    remove(entityId: string, callback: (error: any, enitty: any) => void) {
        this._repository.remove(entityId).then((entity: IEnityModel) => {
            callback(null, entity);
        }).then(null, (error: any) => {
            callback(error, null);
        });
    }

    findById(id: string, callback: (error: any, result: any) => void) {
        this._repository.findById(id).then((entity: IEnityModel) => {
            if (!entity) {
                throw new Error('can not find category');
            }
            callback(null, entity);
        }).then(null, (error: any) => {
            console.log(error);
            callback(error, null);
        });
    }
}

export = ServiceBase;