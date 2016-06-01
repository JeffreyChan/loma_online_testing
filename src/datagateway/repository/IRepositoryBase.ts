
import mongoose = require("mongoose");
import IEntityModel = require("./../../domainmodel/IEntityModel");

interface IRepositoryBase<T extends IEntityModel> {
    /*
        read operation
    */
    retrieve(options?: Object): mongoose.Promise<IEntityModel[]>;
    findOne(options: Object): mongoose.Promise<IEntityModel>;
    findById(entityId: string): mongoose.Promise<IEntityModel>;

    count(cond?: Object): mongoose.Promise<number>;

    /*
        write operation
    */
    create(entity: T): mongoose.Promise<IEntityModel>;
    update(entityId: string, entity: any): mongoose.Promise<IEntityModel>;
    remove(entityId: string): mongoose.Promise<IEntityModel>;
    removeBatch(cond?:Object): mongoose.Promise<IEntityModel>;
}

export = IRepositoryBase;