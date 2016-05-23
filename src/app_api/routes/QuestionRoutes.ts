import express = require("express");
import IQuestionController = require("./.././controllers/IQuestionController");
import QuestionController = require("./.././controllers/QuestionController");

var router = express.Router();
class QuestionRoutes {
    private _controller: IQuestionController;

    constructor() {
        this._controller = new QuestionController();
    }
    get routes() {
        router.post("/question", this._controller.createQuestion.bind(this._controller));
        return router;
    }
}

Object.seal(QuestionRoutes);
export = QuestionRoutes;