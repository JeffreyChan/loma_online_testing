import express = require("express");
import IExamController = require("./.././controllers/IExamController");
import ExamController = require("./.././controllers/ExamController");

var router = express.Router();
class ExamRoutes {
    private _controller: IExamController;

    constructor() {
        this._controller = new ExamController();
    }
    get routes() {
        router.get("/exam/review/:id", this._controller.getReviewRcord.bind(this._controller));
        router.get("/exam/question/:id", this._controller.getQuestionsByType.bind(this._controller));
        
        router.get("/exam/record", this._controller.getExamRecords.bind(this._controller));
        router.post("/exam/record", this._controller.createExamRecord.bind(this._controller));
        router.delete("/exam/record/:id", this._controller.remove.bind(this._controller));
        return router;
    }
}

Object.seal(ExamRoutes);
export = ExamRoutes;