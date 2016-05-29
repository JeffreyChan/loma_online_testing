import express = require("express");
import _ = require('underscore');

import IQuestionService = require("./../../domainservice/IQuestionService");
import QuestionService = require("./../../domainservice/QuestionService");

import IQuestionModel = require("./../../domainmodel/IQuestionModel");
import IQuestionOptionModel = require("./../../domainmodel/IQuestionOptionModel");

import IQuestionController = require("./IQuestionController");
import ControllerBase = require("./ControllerBase");


import Utilities = require("./../../domainmodel/Utilities");

class QuestionController extends ControllerBase<IQuestionModel> implements IQuestionController {
    private _questionService: IQuestionService;

    constructor();
    constructor(questionService: IQuestionService = new QuestionService()) {
        super(questionService);
        this._questionService = questionService;
    }

    updateOption(req: express.Request, res: express.Response): void {
        try {
            let optionId: string = req.params.id;
            let option: IQuestionOptionModel = <IQuestionOptionModel>req.body;
            option._id = optionId;
            if (Utilities.isNullorEmpty(option.answer)) {
                throw new Error("option answer can't be empty!");
            }

            this._questionService.updateOption(option, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }
    getQuestionById(req: express.Request, res: express.Response): void {
        try {
            let entityId: string = req.params.id;
            this._questionService.getQuestionById(entityId, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }

    getQuestions(req: express.Request, res: express.Response): void {
        try {
            let page = parseInt(req.query.page) || 1;
            let size = parseInt(req.query.size) || 10;
            this._questionService.getQuestions(page, size, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }

    private validtorQuestion(question: IQuestionModel): void {
        if (Utilities.isNullorEmpty(question)) {
            throw new Error("Question entity can't be empty!");
        }
        if (Utilities.isNullorEmpty(question.title)) {
            throw new Error("Question title can't be empty!");
        }
        if (Utilities.isNullorEmpty(question.options)) {
            throw new Error("Question options can't be empty!");
        }
    }

    createQuestion(req: express.Request, res: express.Response): void {
        try {
            let question: IQuestionModel = <IQuestionModel>req.body;
            this.validtorQuestion(question);

            this._questionService.createQuestion(question, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }

    updateQuestion(req: express.Request, res: express.Response): void {
        try {
            let question: IQuestionModel = <IQuestionModel>req.body;
            this.validtorQuestion(question);

            question._id = req.params.id;

            this._questionService.updateQuestion(question, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }
    removeQuestion(req: express.Request, res: express.Response): void {
        try {
            let questionId = req.params.id;

            this._questionService.removeQuestion(questionId, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    };
}

Object.seal(QuestionController);
export = QuestionController;  