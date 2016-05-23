import express = require("express");

import IQuestionService = require("./../../domainservice/IQuestionService");
import QuestionService = require("./../../domainservice/QuestionService");

import IQuestionModel = require("./../../domainmodel/IQuestionModel");

import IQuestionController = require("./IQuestionController");
import ControllerBase = require("./ControllerBase");

import _ = require('underscore');
import strUtility = require('underscore.string');

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

            if (this.isNullOrEmpty(question)) {
                throw new Error("Question entity can't be empty!");
            }
            if (this.isNullOrEmpty(question.title)) {
                throw new Error("Question title can't be empty!");
            }
            if (this.isNullOrEmpty(question.options)) {
                throw new Error("Question options can't be empty!");
            }
            this._questionService.createQuestion(question, (error, result) => {
                if (error) {
                   res.json({ "error": error });

                }
                else {
                    res.json({
                        "success": "success",
                        "entity": result
                    });
                }
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.json({ "errorInfo:": error.message });
            }
            else {
                res.json({ "error:": error });
            }
        }
    }
}

Object.seal(QuestionController);
export = QuestionController;  