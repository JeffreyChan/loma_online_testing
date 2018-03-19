
import mongoose = require("mongoose");
import IRepositoryBase = require("./IRepositoryBase");
import ICategoryModel = require("./../../domainmodel/ICategoryModel");
import IEntityModel = require("./../../domainmodel/IEntityModel");

interface ICategoryRepository extends IRepositoryBase<ICategoryModel> {
    getRootCategory(): Promise<ICategoryModel[]>;
    getCategories(skip: number, limit: number): Promise<ICategoryModel[]>;
    getChildCategories(): Promise<ICategoryModel[]>;
    removeCategoryList(doc: Object): Promise<IEntityModel>;
}

export = ICategoryRepository;