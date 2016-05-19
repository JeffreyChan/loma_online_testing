
/// <reference path="./../datagateway/repository/ICategoryRepository.ts" />
import CategoryRepository = require("./../datagateway/repository/CategoryRepository");
import ICategoryRepository = require("./../datagateway/repository/ICategoryRepository");
import ServiceBase = require("./ServiceBase");
import ICategoryService = require("./ICategoryService");
import ICategoryModel = require("./../domainmodel/ICategoryModel");

class CategoryService extends ServiceBase<ICategoryModel> implements ICategoryService {

    constructor() {
        super(new CategoryRepository());
    }  
    
    getRootCategory(isAppendChild: boolean, callback: (error: any, result: any) => void){
        var repository = <ICategoryRepository<ICategoryModel>>this._repository;
        repository.getRootCategory(isAppendChild, callback);
    }
}


Object.seal(CategoryService);
export = CategoryService;