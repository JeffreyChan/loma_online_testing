
/// <reference path="./../datagateway/repository/ICategoryRepository.ts" />
import CategoryRepository = require("./../datagateway/repository/CategoryRepository");
import ICategoryRepository = require("./../datagateway/repository/ICategoryRepository");
import ServiceBase = require("./ServiceBase");
import ICategoryService = require("./ICategoryService");
import ICategoryModel = require("./../domainmodel/ICategoryModel");

class CategoryService extends ServiceBase<ICategoryModel> implements ICategoryService {
    private _categoryRep: ICategoryRepository;
    
    constructor();
    constructor(categoryRep: ICategoryRepository = new CategoryRepository()) {
        super(categoryRep);
        this._categoryRep = categoryRep;
    }

    getRootCategory(isAppendChild: boolean, callback: (error: any, result: any) => void) {
        this._categoryRep.getRootCategory(isAppendChild, callback);
    }
}


Object.seal(CategoryService);
export = CategoryService;