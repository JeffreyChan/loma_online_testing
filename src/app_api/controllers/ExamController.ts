import express = require("express");
import _ = require('underscore');

import IExamService = require("./../../domainservice/IExamService");
import ExamService = require("./../../domainservice/ExamService");

import IQuestionModel = require("./../../domainmodel/IQuestionModel");

import IExamController = require("./IExamController");
import ControllerBase = require("./ControllerBase");


import Utilities = require("./../../domainmodel/Utilities");

class ExamController extends ControllerBase<IQuestionModel> implements IExamController {
    private _examService: IExamService;

    constructor();
    constructor(examService: IExamService = new ExamService()) {
        super(examService);
        this._examService = examService;
    }

    
    getQuestionsByCategory(req: express.Request, res: express.Response): void {
        try {
            let categoryId = req.params.id;

            this._examService.getQuestionsByCategory(categoryId, (error, result) => {
                this.handleResponse(res, error, result);
            });
        }
        catch (errorInfo) {
            this.handleResponse(res, errorInfo, null);
        }
    };
}

Object.seal(ExamController);
export = ExamController;  