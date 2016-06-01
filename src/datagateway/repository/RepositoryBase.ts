import mongoose = require("mongoose");
import IEntityModel = require("./../../domainmodel/IEntityModel");

class RepositoryBase<T extends IEntityModel> {

    private _model: mongoose.Model<IEntityModel>;

    constructor(schemaModel: mongoose.Model<IEntityModel>) {
        this._model = schemaModel;
    }

    create(item: T): mongoose.Promise<IEntityModel> {
        return this._model.create(item);
    }

    retrieve(options: Object): mongoose.Promise<IEntityModel[]> {
        return this._model.find(options || {}).exec();
    }

    findOne(options: Object): mongoose.Promise<IEntityModel> {
        return this._model.findOne(options).exec();
    }

    update(entityId: string, entity: any): mongoose.Promise<IEntityModel> {
        return this._model.update({ _id: entityId }, entity).exec();
    }

    remove(entityId: string): mongoose.Promise<IEntityModel> {
        return this._model.remove({ _id: entityId }).exec();
    }

    removeBatch(cond?: Object): mongoose.Promise<IEntityModel> {
        return this._model.remove(cond || {}).exec();
    }

    findById(entityId: string): mongoose.Promise<IEntityModel> {
        return this._model.findById(entityId).exec();
    }

    count(cond?: Object): mongoose.Promise<number> {
        return this._model.count(cond || {}).exec();
    }


    private toObjectId(id: string): mongoose.Types.ObjectId {
        return new mongoose.Types.ObjectId(id)
    }

}

export = RepositoryBase;