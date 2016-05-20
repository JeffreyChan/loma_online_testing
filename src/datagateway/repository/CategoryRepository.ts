import mongoose = require("mongoose");

import ICategoryModel = require("./../../domainmodel/ICategoryModel");
import CategorySchema = require("./../schemas/CategorySchema");
import RepositoryBase = require("./RepositoryBase");
import ICategoryRepository = require("./ICategoryRepository");
import IEnityModel = require("./../../domainmodel/IEntityModel");

class CategoryRepository extends RepositoryBase<ICategoryModel> implements ICategoryRepository {
    private _dbcontext: mongoose.Model<mongoose.Document>;
    constructor();
    constructor(dbcontext: mongoose.Model<mongoose.Document> = CategorySchema) {
        super(dbcontext);
        this._dbcontext = dbcontext;
    }

    createCategory(item: ICategoryModel, callback: (error: any, result: any) => void) {
        this._dbcontext.create(item, callback);
    }

    getRootCategory(isAppendChild: boolean, callback: (error: any, result: any) => void) {
        if (isAppendChild) {
            this._dbcontext.find({ parent: null }).populate("childrens").exec(callback);
        }
        else {
            this._dbcontext.find({ parent: null }, callback);
        }
    }
}

Object.seal(CategoryRepository);
export = CategoryRepository;