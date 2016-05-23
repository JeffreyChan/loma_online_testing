import IEntityModel = require("./IEntityModel");
import ICategoryModel = require("./ICategoryModel");
import IQuestionOptionModel = require("./IQuestionOptionModel");

interface IQuestionModel extends IEntityModel {
    category: any;
    title: string;
    tip:string;
    correct:any;
    options:any[];
    create_date: Date;
}

export = IQuestionModel;