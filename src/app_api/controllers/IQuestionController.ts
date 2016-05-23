import express = require("express");
import IQuestionModel = require("./../../domainmodel/IQuestionModel");
import IControllerBase = require("./IControllerBase");

interface IQuestionController extends IControllerBase<IQuestionModel> {
    createQuestion: express.RequestHandler;
}
export = IQuestionController;  