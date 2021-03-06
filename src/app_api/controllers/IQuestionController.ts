import express = require("express");
import IQuestionModel = require("./../../domainmodel/IQuestionModel");
import IControllerBase = require("./IControllerBase");

interface IQuestionController extends IControllerBase<IQuestionModel> {
    createQuestion: express.RequestHandler;
    updateQuestion: express.RequestHandler;
    removeQuestion: express.RequestHandler;
    getQuestions: express.RequestHandler;
    getQuestionById: express.RequestHandler;
    updateOption : express.RequestHandler;
}
export = IQuestionController;  