import express = require("express");
import IQuestionModel = require("./../../domainmodel/IQuestionModel");
import IControllerBase = require("./IControllerBase");

interface IQuestionController extends IControllerBase<IQuestionModel> {
    createQuestion: express.RequestHandler;
    updateQuestion: express.RequestHandler;
}
export = IQuestionController;  