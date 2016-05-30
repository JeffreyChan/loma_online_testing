import Promise = require('bluebird');
import _ = require("underscore");

import CategoryRepository = require("./../datagateway/repository/CategoryRepository");
import ICategoryRepository = require("./../datagateway/repository/ICategoryRepository");

import IQuestionRepository = require("./../datagateway/repository/IQuestionRepository");
import IQuestionOptionRepository = require("./../datagateway/repository/IQuestionOptionRepository");

import QuestionRepository = require("./../datagateway/repository/QuestionRepository");
import QuestionOptionRepository = require("./../datagateway/repository/QuestionOptionRepository");

import ServiceBase = require("./ServiceBase");
import IExamService = require("./IExamService");

import ICategoryModel = require("./../domainmodel/ICategoryModel");
import IQuestionModel = require("./../domainmodel/IQuestionModel");
import IQuestionOptionModel = require("./../domainmodel/IQuestionOptionModel");

import Utilities = require("./../domainmodel/Utilities");

class ExamService extends ServiceBase<IQuestionModel> implements IExamService {
    private _categoryRep: ICategoryRepository;
    private _questionRep: IQuestionRepository;
    private _questionOptionRep: IQuestionOptionRepository;

    constructor();
    constructor(questionRep: IQuestionRepository = new QuestionRepository()) {
        super(questionRep);
        this._questionRep = questionRep;
        this._questionOptionRep = new QuestionOptionRepository();
        this._categoryRep = new CategoryRepository();
    }

    getQuestionsByCategory(categoryId: string, callback: (error: any, result: any) => void): void {

        let dbCategory: ICategoryModel;
        let childCatIdList = [];
        let randomFlag = 0;
        Promise.resolve(this._categoryRep.findById(categoryId))
            .then((cat: ICategoryModel) => {
                if (Utilities.isNullorEmpty(cat)) {
                    throw new Error("this category do not exist, please try other");
                }
                dbCategory = cat;
                return cat;
            }).then((cat: ICategoryModel) => {
                return this._questionRep.findOne({ category: cat._id });
            }).then((question: IQuestionModel) => {
                var waitFor;
                if (Utilities.isNullorEmpty(question)) {
                    randomFlag = 1;
                    waitFor = this._categoryRep.findById(dbCategory.parent);
                }
                else {
                    randomFlag = 0;
                    waitFor = this._questionRep.getQuestionsByCategory({ category: categoryId });
                }
                return waitFor;
            }).then((item: any) => {
                console.log(item);
                if (randomFlag === 0) {
                    return item;
                } else {
                    childCatIdList = dbCategory.childrens;
                    return this._questionRep.getQuestionsByCategory({ category: { $in: childCatIdList } });
                }
            }).then((questionList: IQuestionModel[]) => {
                callback(null, questionList);
            }).catch((error: any) => {
                callback(error, null);
            });
    }
}

Object.seal(ExamService);
export = ExamService;