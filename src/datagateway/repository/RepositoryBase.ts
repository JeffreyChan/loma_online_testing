import mongoose = require("mongoose");
import IEnityModel = require("./../../domainmodel/IEntityModel");

class RepositoryBase<T extends IEnityModel> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    create(item: T): Promise<IEnityModel>{
        return this._model.create(item);
    }

    retrieve(options : Object) : Promise<IEnityModel[]> {
        return this._model.find(options).exec();
    }

    update(entityId: string, entity: any): Promise<IEnityModel> {
        return this.findById(entityId).then((getEntity: IEnityModel) => {
            if (!getEntity) {
                throw new Error("can not find this enetity");
            }
            return getEntity;
        }).then((putEntity: IEnityModel) => {
            return this._model.update({ _id: putEntity._id }, entity).exec();
        });
    }

    remove(entityId: string): Promise<IEnityModel> {
        return this.findById(entityId).then((getEntity: IEnityModel) => {
            if (!getEntity) {
                throw new Error("can not find this enetity");
            }
            return getEntity;
        }).then((delEntity: IEnityModel) => {
            return this._model.remove({ _id: delEntity._id }).exec();
        });
    }

    findById(entityId: string): Promise<IEnityModel> {
        return this._model.findById(entityId).exec();
    }


    private toObjectId(id: string): mongoose.Types.ObjectId {
        return new mongoose.Types.ObjectId(id)
    }

}

export = RepositoryBase;