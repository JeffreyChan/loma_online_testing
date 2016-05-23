import IServiceBase = require("./IServiceBase");
import IQuestionModel = require("./../domainmodel/IQuestionModel");

interface IQuestionService extends IServiceBase<IQuestionModel> {
    createQuestion:(question: IQuestionModel, callback: (error: any, result: any) => void) => void;
    updateQuestion:(question: IQuestionModel, callback: (error: any, result: any) => void) => void;
}
export = IQuestionService;