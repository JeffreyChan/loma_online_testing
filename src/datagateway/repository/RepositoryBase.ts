import mongoose = require("mongoose");
import IEnityModel = require("./../../domainmodel/IEntityModel");

class RepositoryBase<T extends IEnityModel> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    create(item: T, callback: (error: any, result: any) => void) {
        this._model.create(item, callback);

    }

    retrieve(callback: (error: any, result: any) => void) {
        this._model.find({}, callback)
    }

    update(id: string, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: this.toObjectId(id) }, item, callback);

    }

    delete(id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(id) }, (err) => callback(err, null));
    }

    findById(id: string, callback: (error: any, result: T) => void) {
        this._model.findById(id, callback);
    }


    private toObjectId(id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(id)
    }

}

export = RepositoryBase;