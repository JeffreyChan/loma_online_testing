
import mongoose = require("mongoose");
import IEnityModel = require("./../../domainmodel/IEntityModel");

interface IRepositoryBase<T extends IEnityModel> {
    /*
        read operation
    */
    retrieve: (options : Object) => mongoose.Promise<IEnityModel[]>;
    findById: (entityId: string) => mongoose.Promise<IEnityModel>;
   
    /*
        write operation
    */
    create: (entity: T) => mongoose.Promise<IEnityModel>;
    update: (entityId: string, entity: any) => mongoose.Promise<IEnityModel>;
    remove: (entityId: string) => mongoose.Promise<IEnityModel>;
}

export = IRepositoryBase;