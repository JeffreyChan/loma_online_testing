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

    getQuestionById(entityId: string): mongoose.Promise<IQuestionModel> {
        return this._dbcontext.findOne({ _id: entityId }).populate("options", "isCorrect answer").exec();
    }

    getQuestions(skip: number, limit: number): mongoose.Promise<IQuestionModel[]> {
        return this._dbcontext.find({}, "-options -random -__v -correct", { skip: skip, limit: limit, sort: "category" }).populate("category", "name").exec();
    }

    getQuestionsByCategory(cond: Object): mongoose.Promise<IQuestionModel[]> {
        return this._dbcontext
            .find(cond)
            .populate("options", "answer")
            .where('random')
            .select("title tip options.anwser")
            .near([Math.random(), Math.random()])
            .exec();
    }
}

Object.seal(QuestionRepository);
export = QuestionRepository;