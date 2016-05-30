import IEntityModel = require("./IEntityModel");

interface IExamRecordModel extends IEntityModel {
    user: any;
    right: number;
    wrong: number;
    answerQuestions: any[],
    create_date: Date;
}

export = IExamRecordModel;