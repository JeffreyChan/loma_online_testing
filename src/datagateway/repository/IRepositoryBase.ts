
import mongoose = require("mongoose");
import IEnityModel = require("./../../domainmodel/IEntityModel");

interface IRepositoryBase<T extends IEnityModel> {
    /*
        read operation
    */
    retrieve: (callback: (error: any, result: any) => void) => void;
    findById: (entityId: string) => Promise<IEnityModel>;
   
    /*
        write operation
    */
    create: (entity: T) => Promise<IEnityModel>;
    update: (entityId: string, entity: any) => Promise<IEnityModel>;
    remove: (entityId: string) => Promise<IEnityModel>;
}

export = IRepositoryBase;