import IEntityModel = require("./IEntityModel");

interface IQuestionOptionModel extends IEntityModel {
    answer: string;
    isCorrect: Boolean;
    create_date: Date;
}

export = IQuestionOptionModel;