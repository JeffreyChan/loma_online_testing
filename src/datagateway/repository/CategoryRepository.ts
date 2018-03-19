import mongoose = require("mongoose");
import ICategoryModel = require("./../../domainmodel/ICategoryModel");
import IEntityModel = require("./../../domainmodel/IEntityModel");
import CategorySchema = require("./../schemas/CategorySchema");
import RepositoryBase = require("./RepositoryBase");
import ICategoryRepository = require("./ICategoryRepository");

class CategoryRepository extends RepositoryBase<ICategoryModel> implements ICategoryRepository {
   
    private _dbcontext: mongoose.Model<ICategoryModel>;
    constructor();
    constructor(dbcontext: mongoose.Model<ICategoryModel> = CategorySchema) {
        super(dbcontext);
        this._dbcontext = dbcontext;
    }

    getRootCategory(): Promise<ICategoryModel[]> {

        return this._dbcontext.find({ parent: null }).select("_id name").exec();
    }
    
    getChildCategories(): Promise<ICategoryModel[]> {
        return this._dbcontext.find({ parent: {$ne:null} }).populate({path:"parent", select:"name"}).select("_id name parent").sort("name").exec();
    }

    removeCategoryList(doc: Object): Promise<IEntityModel> {
        return this._dbcontext.remove(doc).exec();
    }
    
    getCategories (skip:number, limit:number) : Promise<ICategoryModel[]>
    {
        return this._dbcontext.find({},"-childrens",{skip:skip, limit:limit, sort:"name"}).exec();
    }
}

Object.seal(CategoryRepository);
export = CategoryRepository;