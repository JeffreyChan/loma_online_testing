
import mongoose = require("mongoose");
import IRepositoryBase = require("./IRepositoryBase");
import IQuestionModel = require("./../../domainmodel/IQuestionModel");

interface IQuestionRepository extends IRepositoryBase<IQuestionModel>{ 
    
} 

export = IQuestionRepository;