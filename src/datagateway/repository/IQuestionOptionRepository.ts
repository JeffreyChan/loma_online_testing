
import mongoose = require("mongoose");
import IRepositoryBase = require("./IRepositoryBase");
import IQuestionOptionModel = require("./../../domainmodel/IQuestionOptionModel");

interface IQuestionOptionRepository extends IRepositoryBase<IQuestionOptionModel>{ 
     createList: (entityList: IQuestionOptionModel[]) => mongoose.Promise<IQuestionOptionModel[]>;
} 

export = IQuestionOptionRepository;