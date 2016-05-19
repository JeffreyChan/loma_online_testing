
import mongoose = require("mongoose");
import IRepositoryBase = require("./IRepositoryBase");
import ICategoryModel = require("./../../domainmodel/ICategoryModel");

interface ICategoryRepository extends IRepositoryBase<ICategoryModel>{ 
    getRootCategory: (isAppendChild:boolean ,callback: (error:any, result: any) => void) => void;   
} 

export = ICategoryRepository;