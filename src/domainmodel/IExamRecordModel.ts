import IEntityModel = require("./IEntityModel");

interface IExamRecordModel extends IEntityModel {
    user: any;
    right: number;
    wrong: number;
    category:any;
    answerQuestions: any[];
    create_date: Date;
}

export = IExamRecordModel;