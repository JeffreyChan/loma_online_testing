
import mongoose = require("mongoose");

import IRepositoryBase = require("./IRepositoryBase");

class RepositoryBase<T extends mongoose.Document> implements IRepositoryBase<T>{

    protected _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    protected toObjectId(id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(id);
    }

    retrieve(callback: (error: any, result: any) => void) {
        this._model.find({}, callback);
    }

    findById(id: string, callback: (error: any, result: T) => void) {
        this._model.findById(id, callback);
    }

    create(item: T, callback: (error: any, result: any) => void) {
        this._model.create(item, callback);

    }

    update(id: string, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: this.toObjectId(id) }, item, callback);

    }

    delete(id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(id) }, (err) => callback(err, null));
    }
}

export = RepositoryBase;