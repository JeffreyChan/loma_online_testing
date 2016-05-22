
import mongoose = require("mongoose");
import IEnityModel = require("./../../domainmodel/IEntityModel");

interface IRepositoryBase<T extends IEnityModel> {
    /*
        read operation
    */
    retrieve: (options : Object) => Promise<IEnityModel[]>;
    findById: (entityId: string) => Promise<IEnityModel>;
   
    /*
        write operation
    */
    create: (entity: T) => Promise<IEnityModel>;
    update: (entityId: string, entity: any) => Promise<IEnityModel>;
    remove: (entityId: string) => Promise<IEnityModel>;
}

export = IRepositoryBase;