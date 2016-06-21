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

    getQuestions(cond:Object, skip: number, limit: number): mongoose.Promise<IQuestionModel[]> {
        return this._dbcontext.find(cond, "-options -random -__v -correct", { skip: skip, limit: limit, sort: "category" }).populate("category", "name").exec();
    }

    getQuestionsWithOption(cond: Object): mongoose.Promise<IQuestionModel[]> {
        return this._dbcontext
            .find(cond)
            .populate("options")
            .select("-category -create_date -random -__v")
            .exec();
    }

    getQuestionsByType(cond: Object): mongoose.Promise<IQuestionModel[]> {
        return this._dbcontext
            .find(cond)
            .populate("options", "answer")
            .where('random')
            .near([Math.random(), Math.random()])
            .limit(60)
            .select("title tip options")
            .exec();
    }
}

Object.seal(QuestionRepository);
export = QuestionRepository;