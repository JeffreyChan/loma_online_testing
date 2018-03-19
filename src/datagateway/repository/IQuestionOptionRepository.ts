
import mongoose = require("mongoose");
import IRepositoryBase = require("./IRepositoryBase");
import IQuestionOptionModel = require("./../../domainmodel/IQuestionOptionModel");

interface IQuestionOptionRepository extends IRepositoryBase<IQuestionOptionModel> {
    createList(entityList: IQuestionOptionModel[]): Promise<IQuestionOptionModel[]>;
    updateList(cond: Object, update: Object): Promise<IQuestionOptionModel>;
    removeList(cond: Object): Promise<IQuestionOptionModel>;
}

export = IQuestionOptionRepository;