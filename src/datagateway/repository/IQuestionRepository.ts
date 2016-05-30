
import mongoose = require("mongoose");
import IRepositoryBase = require("./IRepositoryBase");
import IQuestionModel = require("./../../domainmodel/IQuestionModel");

interface IQuestionRepository extends IRepositoryBase<IQuestionModel>{ 
    getQuestionById: (entityId:string) => mongoose.Promise<IQuestionModel>; 
    getQuestions: (skip:number, limit:number) => mongoose.Promise<IQuestionModel[]>; 
    getQuestionsByCategory: (cond:Object) => mongoose.Promise<IQuestionModel[]>; 
} 

export = IQuestionRepository;