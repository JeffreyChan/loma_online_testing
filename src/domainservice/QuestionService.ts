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

    updateOption(option: IQuestionOptionModel, callback: (error: any, result: any) => void): void {
        let returnOption: IQuestionOptionModel;
        Promise.resolve(this._questionOptionRep.findById(option._id))
            .then((dbOption: IQuestionOptionModel) => {
                if (Utilities.isNullorEmpty(dbOption)) {
                    throw new Error("the question option do not exists, please try other!");
                }
                returnOption = dbOption;
                return dbOption;
            })
            .then((dbOption: IQuestionOptionModel) => {
                return this._questionOptionRep.update(option._id, { answer: option.answer });
            })
            .then((updateInfo: any) => {
                returnOption.answer = option.answer;
                callback(null, returnOption);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    getQuestionById(questionId, callback: (error: any, result: any) => void): void {
        Promise.resolve(this._questionRep.getQuestionById(questionId))
            .then((findQuesion: IQuestionModel) => {
                if (Utilities.isNullorEmpty(findQuesion)) {
                    throw new Error("the question do not exists, please try other!");
                }
                return findQuesion;
            }).then((item: IQuestionModel) => {
                callback(null, item);
            }).catch((error: any) => {
                callback(error, null);
            });
    }
    getQuestions(title: string, page: number, size: number, callback: (error: any, result: any) => void): void {
        let totalCount: number = 0;
        let skip: number = ((page - 1) * size);
        let cond: Object = {};
        if (!Utilities.isNullorEmpty(title)) {
            cond = { title: { $regex: title, $options:"i" } };
        }
        Promise.resolve(this._questionRep.count(cond))
            .then((totalNum: number) => {
                totalCount = totalNum;
                return totalNum;
            })
            .then((count: number) => {

                console.log(title);
                return this._questionRep.getQuestions(cond, skip, size);
            })
            .then((questionDataList: IQuestionModel[]) => {
                let flatQuestions = _.map(questionDataList, (item: IQuestionModel) => {
                    return {
                        _id: item._id,
                        category: item.category.name,
                        title: item.title,
                        tip: item.tip,
                        create_date: item.create_date
                    };
                });
                callback(null, {
                    totalNum: totalCount,
                    data: flatQuestions
                });
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    private validtorOptions(question: IQuestionModel): void {
        if (question.options.length !== 4) {
            throw new Error("the question's option only have four item!");
        }
        let answerCount = _.countBy(question.options, (item: IQuestionOptionModel) => {
            return item.isCorrect ? "Right" : "Wrong";
        });

        if (answerCount["Right"] !== 1) {
            throw new Error("the question's option only have one right answer!");
        }

        let checkAnswerField = _.every(question.options, (item: IQuestionOptionModel) => {
            return _.has(item, "isCorrect");
        });
        if (!checkAnswerField) {
            throw new Error("the question's option must have answer filed, eg:isCorrect!");
        }
    }

    createQuestion(question: IQuestionModel, callback: (error: any, result: any) => void) {
        this.validtorOptions(question);
        let category: ICategoryModel;
       
        Promise.resolve(this._categoryRep.findById(question.category))
            .then((cat: ICategoryModel) => {
                if (Utilities.isNullorEmpty(cat)) {
                    throw new Error("the question category do not exists, please try other!");
                }
                return cat;
            })
            .then((cat: ICategoryModel) => {
                category = cat;
                return this._questionRep.findOne({ title: question.title, category: question.category });
            })
            .then((findQuestions: IQuestionModel) => {
                if (!Utilities.isNullorEmpty(findQuestions)) {
                    throw new Error("the question exists under this category, please try other!");
                }
                if (!Utilities.isNullorEmpty(category.childrens)) {
                    throw new Error("the question category only can be selected in level, please try other!");
                }
                return this._questionOptionRep.createList(question.options);
            })
            .then((questionOptions: IQuestionOptionModel[]) => {
                let rightAnswer = _.find(questionOptions, (item: IQuestionOptionModel) => {
                    return item.isCorrect ? item : null;
                });
                question.options = questionOptions;
                question.correct = rightAnswer;
                question.category = category;
                
                return this._questionRep.create(question);
            })
            .then((qes: IQuestionModel) => {
                callback(null, qes);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    updateQuestion(question: IQuestionModel, callback: (error: any, result: any) => void) {
        this.validtorOptions(question);

        let dbCategory: ICategoryModel;
        let dbQuestionInfo: any;
        let dbOptionIdsList = [];
        let dbRightOptionId: any;
        let rightOptionId: any;
        Promise.resolve(this._categoryRep.findById(question.category))
            .then((cat: ICategoryModel) => {
                if (Utilities.isNullorEmpty(cat)) {
                    throw new Error("the question category do not exists, please try other!");
                }
                return cat;
            })
            .then((cat: ICategoryModel) => {
                if (!Utilities.isNullorEmpty(cat.childrens)) {
                    throw new Error("the question category only can be selected in level, please try other!");
                }
                dbCategory = cat;
                return this._questionRep.findById(question._id);
            })
            .then((getQuestion: IQuestionModel) => {
                if (Utilities.isNullorEmpty(getQuestion)) {
                    throw new Error("the question can not be found, please try other!");
                }

                _.forEach(question.options, (item: IQuestionOptionModel) => {
                    dbOptionIdsList.push(item._id);
                });
                return this._questionOptionRep.retrieve({ _id: { $in: dbOptionIdsList } });
            })
            .then((options: IQuestionOptionModel[]) => {
                if (options.length !== 4) {
                    throw new Error("the question's option do not match the original!");
                }

                let newAnswer = _.find(question.options, (item: IQuestionOptionModel) => {
                    return item.isCorrect;
                });

                let dbAnswer = _.find(options, (item: IQuestionOptionModel) => {
                    return item.isCorrect;
                });
                rightOptionId = newAnswer._id;

                dbRightOptionId = dbAnswer._id;

                let updateOption = { category: dbCategory._id, tip: question.tip, title: question.title, correct: rightOptionId };

                return this._questionRep.update(question._id, updateOption);
            })
            .then((tmpQuestion: any) => {
                dbQuestionInfo = tmpQuestion;
                return this._questionOptionRep.update(dbRightOptionId, { isCorrect: false });
            })
            .then((updateWrongInfo: any) => {
                return this._questionOptionRep.update(rightOptionId, { isCorrect: true });
            })
            .then((updateRightInfo: any) => {
                callback(null, dbQuestionInfo);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    removeQuestion(id: string, callback: (error: any, result: any) => void) {
        let dbQuestion: IQuestionModel;
        let questionDelInfo: any;
        Promise.resolve(this._questionRep.findById(id))
            .then((item: IQuestionModel) => {
                if (Utilities.isNullorEmpty(item)) {
                    throw new Error("the question can not be found, please try other!");
                }
                dbQuestion = item;
                return this._questionRep.remove(id);
            }).then((delInfo: any) => {
                questionDelInfo = delInfo;
                return this._questionOptionRep.removeList({ _id: { $in: dbQuestion.options } });
            }).then((delInfo: any) => {
                callback(null, questionDelInfo);
            }).catch((error: any) => {
                callback(error, null);
            });
    }
}


Object.seal(QuestionService);
export = QuestionService;