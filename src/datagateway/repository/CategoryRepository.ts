import mongoose = require("mongoose");

import ICategoryModel = require("./../../domainmodel/ICategoryModel");
import CategorySchema = require("./../schemas/CategorySchema");
import RepositoryBase = require("./RepositoryBase");
import ICategoryRepository = require("./ICategoryRepository");

class CategoryRepository extends RepositoryBase<ICategoryModel> implements ICategoryRepository {
    private _dbcontext: mongoose.Model<mongoose.Document>;
    constructor();
    constructor(dbcontext: mongoose.Model<mongoose.Document> = CategorySchema) {
        super(dbcontext);
        this._dbcontext = dbcontext;
    }

    getRootCategory(): mongoose.Promise<ICategoryModel[]> {

         return this._dbcontext.find({parent:null}).select("_id name").exec();
    }
    
    removeCategoryList(doc:Object): mongoose.Promise<ICategoryModel[]>
    {
        return this._dbcontext.remove(doc).exec();
    }
}

Object.seal(CategoryRepository);
export = CategoryRepository;