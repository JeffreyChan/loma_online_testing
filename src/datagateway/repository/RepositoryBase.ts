import mongoose = require("mongoose");
import IEnityModel = require("./../../domainmodel/IEntityModel");

class RepositoryBase<T extends IEnityModel> {

    private _model: mongoose.Model<IEnityModel>;

    constructor(schemaModel: mongoose.Model<IEnityModel>) {
        this._model = schemaModel;
    }

    create(item: T): mongoose.Promise<IEnityModel>{
        return this._model.create(item);
    }

    retrieve(options : Object) : mongoose.Promise<IEnityModel[]> {
        return this._model.find(options).exec();
    }

    update(entityId: string, entity: any): mongoose.Promise<IEnityModel> {
        return this.findById(entityId).then((getEntity: IEnityModel) => {
            if (!getEntity) {
                throw new Error("can not find this enetity");
            }
            return getEntity;
        }).then((putEntity: IEnityModel) => {
            return this._model.update({ _id: putEntity._id }, entity).exec();
        });
    }

    remove(entityId: string): mongoose.Promise<IEnityModel> {
        return this.findById(entityId).then((getEntity: IEnityModel) => {
            if (!getEntity) {
                throw new Error("can not find this enetity");
            }
            return getEntity;
        }).then((delEntity: IEnityModel) => {
            return this._model.remove({ _id: delEntity._id }).exec();
        });
    }

    findById(entityId: string): mongoose.Promise<IEnityModel> {
        return this._model.findById(entityId).exec();
    }


    private toObjectId(id: string): mongoose.Types.ObjectId {
        return new mongoose.Types.ObjectId(id)
    }

}

export = RepositoryBase;