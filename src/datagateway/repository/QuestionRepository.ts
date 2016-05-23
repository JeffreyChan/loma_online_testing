import mongoose = require("mongoose");

import QuestionSchema = require("./../schemas/QuestionSchema");
import RepositoryBase = require("./RepositoryBase");
import IQuestionRepository = require("./IQuestionRepository");

import IQuestionModel = require("./../../domainmodel/IQuestionModel");

class QuestionRepository extends RepositoryBase<IQuestionModel> implements IQuestionRepository {
    
    private _dbcontext: mongoose.Model<IQuestionModel>;
    constructor();
    constructor(dbcontext: mongoose.Model<IQuestionModel> = QuestionSchema) {
        super(dbcontext);
        this._dbcontext = dbcontext;
    }
}

Object.seal(QuestionRepository);
export = QuestionRepository;