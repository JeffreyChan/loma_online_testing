import ICategoryModel = require("./../../domainmodel/ICategoryModel");
import CategorySchema = require("./../schemas/CategorySchema");
import RepositoryBase = require("./RepositoryBase");
import ICategoryRepository = require("./ICategoryRepository");

class CategoryRepository extends RepositoryBase<ICategoryModel> implements ICategoryRepository<ICategoryModel>  {
    constructor() {
        super(CategorySchema);
    }

    getRootCategory(isAppendChild: boolean, callback: (error: any, result: any) => void) {
        if (isAppendChild) {
            this._model.find({ parent: null }).populate("childrens").exec(callback);
        }
        else {
            this._model.find({ parent: null }, callback);
        }
    }
}

Object.seal(CategoryRepository);
export = CategoryRepository;