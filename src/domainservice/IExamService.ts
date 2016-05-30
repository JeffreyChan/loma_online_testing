import IServiceBase = require("./IServiceBase");
import IQuestionModel = require("./../domainmodel/IQuestionModel");

interface IExamService extends IServiceBase<IQuestionModel> {
    getQuestionsByCategory: (categoryId: string, callback: (error: any, result: any) => void) => void;
}
export = IExamService;