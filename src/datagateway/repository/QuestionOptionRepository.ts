import mongoose = require("mongoose");

import QuestionOptionSchema = require("./../schemas/QuestionOptionSchema");
import RepositoryBase = require("./RepositoryBase");
import IQuestionOptionRepository = require("./IQuestionOptionRepository");

import IQuestionOptionModel = require("./../../domainmodel/IQuestionOptionModel");

class QuestionOptionRepository extends RepositoryBase<IQuestionOptionModel> implements IQuestionOptionRepository {

    private _dbcontext: mongoose.Model<IQuestionOptionModel>;
    constructor();
    constructor(dbcontext: mongoose.Model<IQuestionOptionModel> = QuestionOptionSchema) {
        super(dbcontext);
        this._dbcontext = dbcontext;
    }

    createList(entityList: IQuestionOptionModel[]): mongoose.Promise<IQuestionOptionModel[]> {
        return this._dbcontext.create(entityList);
    }

    updateList(cond: Object, update: Object): mongoose.Promise<IQuestionOptionModel> {
        return this._dbcontext.update(cond, update, { multi: true }).exec();
    }
    
    removeList (cond: Object) : mongoose.Promise<IQuestionOptionModel>{
        return this._dbcontext.remove(cond).exec();
    }
}

Object.seal(QuestionOptionRepository);
export = QuestionOptionRepository;