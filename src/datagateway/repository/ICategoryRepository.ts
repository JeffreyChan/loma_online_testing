
import mongoose = require("mongoose");
import IRepositoryBase = require("./IRepositoryBase");
import ICategoryModel = require("./../../domainmodel/ICategoryModel");
import IEnityModel = require("./../../domainmodel/IEntityModel");

interface ICategoryRepository extends IRepositoryBase<ICategoryModel>{ 
    getRootCategory: () => mongoose.Promise<ICategoryModel[]>;   
    getCategories: (skip:number, limit:number) => mongoose.Promise<ICategoryModel[]>;   
    getChildCategories: () => mongoose.Promise<ICategoryModel[]>; 
    removeCategoryList:(doc:Object) => mongoose.Promise<ICategoryModel[]>;  
} 

export = ICategoryRepository;