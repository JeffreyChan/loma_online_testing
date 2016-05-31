import express = require("express");
import IQuestionModel = require("./../../domainmodel/IQuestionModel");
import IControllerBase = require("./IControllerBase");

interface IExamController extends IControllerBase<IQuestionModel> {
    getQuestionsByType: express.RequestHandler;
    createExamRecord: express.RequestHandler;
    getExamRecords: express.RequestHandler;
    getReviewRcord: express.RequestHandler;
}
export = IExamController;  