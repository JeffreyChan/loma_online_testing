
import mongoose = require("mongoose");
import IEntityModel = require("./../../domainmodel/IEntityModel");

interface IRepositoryBase<T extends IEntityModel> {
    /*
        read operation
    */
    retrieve(options?: Object): Promise<IEntityModel[]>;
    findOne(options: Object): Promise<IEntityModel>;
    findById(entityId: string): Promise<IEntityModel>;

    count(cond?: Object): Promise<number>;

    /*
        write operation
    */
    create(entity: T): Promise<IEntityModel>;
    update(entityId: string, entity: any): Promise<IEntityModel>;
    remove(entityId: string): Promise<IEntityModel>;
    removeBatch(cond?:Object): Promise<IEntityModel>;
}

export = IRepositoryBase;