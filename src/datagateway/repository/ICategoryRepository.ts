
import mongoose = require("mongoose");
import IRepositoryBase = require("./IRepositoryBase");
import ICategoryModel = require("./../../domainmodel/ICategoryModel");
import IEnityModel = require("./../../domainmodel/IEntityModel");

interface ICategoryRepository extends IRepositoryBase<ICategoryModel>{ 
    getRootCategory: () => mongoose.Promise<ICategoryModel[]>;   
} 

export = ICategoryRepository;