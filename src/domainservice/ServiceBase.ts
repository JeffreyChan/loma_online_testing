import mongoose = require("mongoose");
import IRepositoryBase = require("./../datagateway/repository/IRepositoryBase");

class ServiceBase<T extends mongoose.Document> {
    protected _repository:IRepositoryBase<T>;
    
    constructor (repository) {
        this._repository = repository;
    }  
        
    create (item: T, callback: (error: any, result: any) => void) {
        this._repository.create(item, callback);   
    }
   
    retrieve (callback: (error: any, result: any) => void) {
         this._repository.retrieve(callback);
    }
    
    update (id: string, item: T, callback: (error: any, result: any) => void) {
        
        this._repository.findById(id, (err, res) => {
            if(err) {
                callback(err, res);
            }
            else 
            {
                this._repository.update(res._id, item, callback);
            }  
        });    
    }
    
    delete (id: string, callback:(error: any, result: any) => void) {
        this._repository.delete(id , callback);
    }
    
    findById (id: string, callback: (error: any, result: any) => void) {
        this._repository.findById(id, callback);
    }
}


Object.seal(ServiceBase);
export = ServiceBase;