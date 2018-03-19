
import mongoose = require("mongoose");
import IRepositoryBase = require("./IRepositoryBase");
import IQuestionModel = require("./../../domainmodel/IQuestionModel");

interface IQuestionRepository extends IRepositoryBase<IQuestionModel> {
    getQuestionById(entityId: string): Promise<IQuestionModel>;
    getQuestions(cond:Object, skip: number, limit: number): Promise<IQuestionModel[]>;
    getQuestionsByType(cond: Object): Promise<IQuestionModel[]>;
    getQuestionsWithOption(cond: Object): Promise<IQuestionModel[]>;
}

export = IQuestionRepository;