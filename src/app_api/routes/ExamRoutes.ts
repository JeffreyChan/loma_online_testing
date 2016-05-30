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
        router.get("/exam/question/:id", this._controller.getQuestionsByCategory.bind(this._controller));
        return router;
    }
}

Object.seal(ExamRoutes);
export = ExamRoutes;