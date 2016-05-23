import Promise = require('bluebird');
import _ = require("underscore");

import CategoryRepository = require("./../datagateway/repository/CategoryRepository");
import ICategoryRepository = require("./../datagateway/repository/ICategoryRepository");

import IQuestionRepository = require("./../datagateway/repository/IQuestionRepository");
import IQuestionOptionRepository = require("./../datagateway/repository/IQuestionOptionRepository");

import QuestionRepository = require("./../datagateway/repository/QuestionRepository");
import QuestionOptionRepository = require("./../datagateway/repository/QuestionOptionRepository");

import ServiceBase = require("./ServiceBase");
import IQuestionService = require("./IQuestionService");

import ICategoryModel = require("./../domainmodel/ICategoryModel");
import IQuestionModel = require("./../domainmodel/IQuestionModel");
import IQuestionOptionModel = require("./../domainmodel/IQuestionOptionModel");

import Utilities = require("./../domainmodel/Utilities");

class QuestionService extends ServiceBase<IQuestionModel> implements IQuestionService {
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

    createQuestion(question: IQuestionModel, callback: (error: any, result: any) => void) {
        if (question.options.length !== 4) {
            throw new Error("the question's option only have four item!");
        }
        let answerCount = _.countBy(question.options, (item: IQuestionOptionModel) => {
            return item.isCorrect ? "Right" : "Wrong";
        });
        console.log(answerCount);
        if (answerCount["Right"] !== 1) {
            throw new Error("the question's option only have one right answer!");
        }
        let category: ICategoryModel;
        Promise.resolve(this._categoryRep.findById(question.category).then((cat: ICategoryModel) => {
            if (Utilities.isNullorEmpty(cat)) {
                throw new Error("the question category do not exists, please try other!");
            }
            return cat;
        })).then((cat: ICategoryModel) => {
            category = cat;
            return this._questionOptionRep.createList(question.options);
        }).then((questionOptions: IQuestionOptionModel[]) => {
            console.log("the count is: " + questionOptions.length);
            console.log("the origin count is: " + question.options.length);
            let rightAnswer = _.find(questionOptions, (item: IQuestionOptionModel) => {
                return item.isCorrect ? item : null;
            });
            question.options = questionOptions;
            question.correct = rightAnswer;
            question.category = category;

            return this._questionRep.create(question);
        }).then((qes: IQuestionModel) => {
            callback(null, qes);
        }).catch((error: any) => {
            callback(error, null);
        });
    }

    updateQuestion(question: IQuestionModel, callback: (error: any, result: any) => void) {
        if (question.options.length !== 4) {
            throw new Error("the question's option only have four item!");
        }
        let answerCount = _.countBy(question.options, (item: IQuestionOptionModel) => {
            return item.isCorrect ? "Right" : "Wrong";
        });
        console.log(answerCount);
        if (answerCount["Right"] !== 1) {
            throw new Error("the question's option only have one right answer!");
        }
        let dbCategory: ICategoryModel;
        let dbQuestion: any;
        let dbOptionsList: IQuestionOptionModel[];
        let wrongOptionsIds = [];
        let rightOptionId: any;
        Promise.resolve(this._categoryRep.findById(question.category).then((cat: ICategoryModel) => {
            if (Utilities.isNullorEmpty(cat)) {
                throw new Error("the question category do not exists, please try other!");
            }
            return cat;
        })).then((cat: ICategoryModel) => {
            if (!Utilities.isNullorEmpty(cat.childrens)) {
                throw new Error("the question category only can be selected in level, please try other!");
            }
            dbCategory = cat;
            return this._questionRep.findById(question._id);
        }).then((getQuestion: IQuestionModel) => {
            if (Utilities.isNullorEmpty(getQuestion)) {
                throw new Error("the question can not be found, please try other!");
            }

            let optionsIds = [];
            _.forEach(question.options, (item: IQuestionOptionModel) => {
                optionsIds.push(item._id);
            });
            return this._questionOptionRep.retrieve({ _id: { $in: optionsIds } });
        }).then((options: IQuestionOptionModel[]) => {
            if (options.length !== 4) {
                throw new Error("the question's option do not match the original!");
            }

            let newAnswer = _.find(question.options, (item: IQuestionOptionModel) => {
                return item.isCorrect;
            });

            rightOptionId = _.map(question.options, (item: IQuestionOptionModel) => {
                return !item.isCorrect ? item._id : "";
            })
            rightOptionId = newAnswer._id;

            let updateOption = { category: dbCategory._id, tip: question.tip, title: question.title, correct: rightOptionId };

            return this._questionRep.update(question._id, updateOption);
        }).then((tmpQuestion: IQuestionModel) => {
            dbQuestion = tmpQuestion;
            return this._questionOptionRep.update(rightOptionId, { isCorrect: true });
        }).then((rightOption: IQuestionOptionModel) => {
            return this._questionOptionRep.updateList({ _id: { $in: wrongOptionsIds } }, { isCorrect: true });
        }).then((wrongOption: IQuestionOptionModel) => {
            callback(null, dbQuestion);
        }).catch((error: any) => {
            callback(error, null);
        });
    }
}


Object.seal(QuestionService);
export = QuestionService;