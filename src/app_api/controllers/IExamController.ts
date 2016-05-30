import express = require("express");
import IQuestionModel = require("./../../domainmodel/IQuestionModel");
import IControllerBase = require("./IControllerBase");

interface IExamController extends IControllerBase<IQuestionModel> {
    getQuestionsByCategory: express.RequestHandler;
}
export = IExamController;  