import Promise = require('bluebird');
import _ = require("underscore");

import CategoryRepository = require("./../datagateway/repository/CategoryRepository");
import ICategoryRepository = require("./../datagateway/repository/ICategoryRepository");

import IExamRecordRepository = require("./../datagateway/repository/IExamRecordRepository");
import IQuestionRepository = require("./../datagateway/repository/IQuestionRepository");
import IQuestionOptionRepository = require("./../datagateway/repository/IQuestionOptionRepository");

import ExamRecordRepository = require("./../datagateway/repository/ExamRecordRepository");
import QuestionRepository = require("./../datagateway/repository/QuestionRepository");
import QuestionOptionRepository = require("./../datagateway/repository/QuestionOptionRepository");

import ServiceBase = require("./ServiceBase");
import IExamService = require("./IExamService");

import ICategoryModel = require("./../domainmodel/ICategoryModel");
import IQuestionModel = require("./../domainmodel/IQuestionModel");
import IQuestionOptionModel = require("./../domainmodel/IQuestionOptionModel");
import IExamRecordModel = require("./../domainmodel/IExamRecordModel");

import Utilities = require("./../domainmodel/Utilities");



class ExamService extends ServiceBase<IExamRecordModel> implements IExamService {
    private _categoryRep: ICategoryRepository;
    private _questionRep: IQuestionRepository;
    private _questionOptionRep: IQuestionOptionRepository;
    private _examRep: IExamRecordRepository;

    constructor();
    constructor(examRep: IExamRecordRepository = new ExamRecordRepository()) {
        super(examRep);
        this._examRep = examRep;
        this._questionRep = new QuestionRepository();
        this._questionOptionRep = new QuestionOptionRepository();
        this._categoryRep = new CategoryRepository();
    }

    getExamRecords(page: number, size: number, callback: (error: any, result: any) => void): void {
        let totalCount: number = 0;
        let skip: number = ((page - 1) * size);
        Promise.resolve(this._examRep.count())
            .then((count: number) => {
                totalCount = count
                return this._examRep.getExamRecords(skip, size);
            })
            .then((records: IExamRecordModel[]) => {
                let flatRecords = _.map(records, (item: IExamRecordModel) => {
                    return {
                        _id: item._id,
                        user: item.user,
                        category: item.category.name,
                        right: item.right,
                        wrong: item.wrong,
                        create_date: item.create_date
                    };
                });
                callback(null, {
                    totalNum: totalCount,
                    data: flatRecords
                });
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    createExamRecord(examrecord: IExamRecordModel, callback: (error: any, result: any) => void): void {
        let questionIds = _.pluck(examrecord.answerQuestions, "Q");
        let answerIds = _.pluck(examrecord.answerQuestions, "A");
        let rightCount: number = 0;
        let wrongCount: number = 0;
        let checkQAEmpty = _.every(examrecord.answerQuestions, function (item) {
            return !Utilities.isNullorEmpty(item.Q) && !Utilities.isNullorEmpty(item.A);
        });

        if (!checkQAEmpty) {
            throw new Error("some of QA is empty, please try other");
        }

        if (questionIds.length !== answerIds.length) {
            throw new Error("QA do not match, please try other");
        }
        let dbCategory: ICategoryModel;
        Promise.resolve(this._categoryRep.findById(examrecord.category))
            .then((cat: ICategoryModel) => {
                if (Utilities.isNullorEmpty(cat)) {
                    throw new Error("this category do not exist, please try other");
                }
                dbCategory = cat;
                return this._questionRep.count({ category: examrecord.category });
            })
            .then((questionCount: number) => {
                if (questionCount === 0) {
                    if (examrecord.answerQuestions.length !== 60) {
                        throw new Error("random exam must have 60 question need to answer, please try other");
                    }
                } else {
                    if (examrecord.answerQuestions.length !== questionCount) {
                        throw new Error("chapter exam must have " + questionCount + " question need to answer, please try other");
                    }
                }

                return this._questionRep.count({ _id: { $in: questionIds } });
            })
            .then((dbQuestionCount: number) => {
                if (dbQuestionCount !== questionIds.length) {
                    throw new Error("Question count do not match database count, please try other");
                }
                return this._questionOptionRep.count({ _id: { $in: answerIds } });
            })
            .then((dbAnserCount: number) => {
                if (dbAnserCount !== answerIds.length) {
                    throw new Error("Question Option count do not match database count, please try other");
                }
                return this._questionRep.count({ correct: { $in: answerIds } });
            })
            .then((dbRightAnswerCount: number) => {
                rightCount = dbRightAnswerCount;
                wrongCount = answerIds.length - rightCount;
                examrecord.right = rightCount;
                examrecord.wrong = wrongCount;
                return this._examRep.create(examrecord);
            })
            .then((dbExamRecord: IExamRecordModel) => {
                callback(null, dbExamRecord);
            })
            .catch((error: any) => {
                callback(error, null);
            });;
    }

    getQuestionsByType(categoryId: string, callback: (error: any, result: any) => void): void {

        let dbCategory: ICategoryModel;
        let childCatIdList = [];
        let randomFlag = 0;
        Promise.resolve(this._categoryRep.findById(categoryId))
            .then((cat: ICategoryModel) => {
                if (Utilities.isNullorEmpty(cat)) {
                    throw new Error("this category do not exist, please try other");
                }
                dbCategory = cat;
                return this._questionRep.findOne({ category: cat._id });
            })
            .then((question: IQuestionModel) => {
                let waitFor:any;
                if (Utilities.isNullorEmpty(question)) {
                    randomFlag = 1;
                    waitFor = this._categoryRep.findById(dbCategory.parent);
                }
                else {
                    randomFlag = 0;
                    waitFor = this._questionRep.getQuestionsByType({ category: categoryId });
                }
                return waitFor;
            })
            .then((item: any) => {
                if (randomFlag === 0) {
                    return item;
                } else {
                    childCatIdList = item.childrens;
                    return this._questionRep.getQuestionsByType({ category: { $in: childCatIdList } });
                }
            })
            .then((questionList: IQuestionModel[]) => {
                callback(null, questionList);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    getReviewRcord(examRecordId: string, callback: (error: any, result: any) => void): void {
        let dbRecord: IExamRecordModel;
        Promise.resolve(this._examRep.findById(examRecordId))
            .then((record: IExamRecordModel) => {
                if (Utilities.isNullorEmpty(record)) {
                    throw new Error("this record do not exist, please try other");
                }
                dbRecord = record;
                let questionIds = _.pluck(record.answerQuestions, "Q");
                return this._questionRep.getQuestionsWithOption({ _id: { $in: questionIds } });
            })
            .then((questions: IQuestionModel[]) => {
                let combineObj = {
                    examrecord: dbRecord,
                    questions: questions
                };
                callback(null, combineObj);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }
}

Object.seal(ExamService);
export = ExamService;