import IServiceBase = require("./IServiceBase");
import IQuestionModel = require("./../domainmodel/IQuestionModel");
import IQuestionOptionModel = require("./../domainmodel/IQuestionOptionModel");

interface IQuestionService extends IServiceBase<IQuestionModel> {
    updateOption: (option:IQuestionOptionModel , callback: (error: any, result: any) => void) => void;
    createQuestion: (question: IQuestionModel, callback: (error: any, result: any) => void) => void;
    updateQuestion: (question: IQuestionModel, callback: (error: any, result: any) => void) => void;
    removeQuestion: (id: string, callback: (error: any, result: any) => void) => void;
    getQuestionById: (questionId, callback: (error: any, result: any) => void) => void;
    getQuestions: (page: number, size: number, callback: (error: any, result: any) => void) => void;
}
export = IQuestionService;