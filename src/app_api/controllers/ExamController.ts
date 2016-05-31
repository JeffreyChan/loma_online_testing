import express = require("express");
import _ = require('underscore');

import IExamService = require("./../../domainservice/IExamService");
import ExamService = require("./../../domainservice/ExamService");

import IQuestionModel = require("./../../domainmodel/IQuestionModel");
import IExamRecordModel = require("./../../domainmodel/IExamRecordModel");

import IExamController = require("./IExamController");
import ControllerBase = require("./ControllerBase");


import Utilities = require("./../../domainmodel/Utilities");


class ExamController extends ControllerBase<IExamRecordModel> implements IExamController {
    private _examService: IExamService;

    constructor();
    constructor(examService: IExamService = new ExamService()) {
        super(examService);
        this._examService = examService;
    }

    private validtorExamRecord(examRecord: IExamRecordModel): void {
        if (Utilities.isNullorEmpty(examRecord)) {
            throw new Error("ExamRecord entity can't be empty!");
        }
        if (Utilities.isNullorEmpty(examRecord.user)) {
            throw new Error("ExamRecord User can't be empty!");
        }
        if (Utilities.isNullorEmpty(examRecord.category)) {
            throw new Error("ExamRecord Category can't be empty!");
        }
        if (Utilities.isNullorEmpty(examRecord.answerQuestions)) {
            throw new Error("ExamRecord AnswerQuestions can't be empty!");
        }
    }

    createExamRecord(req: express.Request, res: express.Response): void {


        try {
            var item: IExamRecordModel = <IExamRecordModel>req.body;
            this.validtorExamRecord(item);

            this._examService.createExamRecord(item, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }

    }

    getQuestionsByType(req: express.Request, res: express.Response): void {
        try {
            let categoryId = req.params.id;
            if (Utilities.isNullorEmpty(categoryId)) {
                throw new Error("categoryId can't be empty!");
            }

            this._examService.getQuestionsByType(categoryId, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    };

    getReviewRcord(req: express.Request, res: express.Response) {
        try {
            let recordId = req.params.id;
            if (Utilities.isNullorEmpty(recordId)) {
                throw new Error("examrecordId can't be empty!");
            }
            this._examService.getReviewRcord(recordId, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }

    getExamRecords(req: express.Request, res: express.Response) {
        try {
            let page = parseInt(req.query.page) || 1;
            let size = parseInt(req.query.size) || 10;
            this._examService.getExamRecords(page, size, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }
}

Object.seal(ExamController);
export = ExamController;  