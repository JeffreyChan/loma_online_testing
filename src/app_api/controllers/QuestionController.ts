import express = require("express");
import _ = require('underscore');

import IQuestionService = require("./../../domainservice/IQuestionService");
import QuestionService = require("./../../domainservice/QuestionService");

import IQuestionModel = require("./../../domainmodel/IQuestionModel");

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

    createQuestion(req: express.Request, res: express.Response): void {
        try {
            let question: IQuestionModel = <IQuestionModel>req.body;

            if (Utilities.isNullorEmpty(question)) {
                throw new Error("Question entity can't be empty!");
            }
            if (Utilities.isNullorEmpty(question.title)) {
                throw new Error("Question title can't be empty!");
            }
            if (Utilities.isNullorEmpty(question.options)) {
                throw new Error("Question options can't be empty!");
            }
            this._questionService.createQuestion(question, (error, result) => {
                this.handleResponse(res, error,result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    }
}

Object.seal(QuestionController);
export = QuestionController;  