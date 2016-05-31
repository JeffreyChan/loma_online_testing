import IServiceBase = require("./IServiceBase");
import IQuestionModel = require("./../domainmodel/IQuestionModel");
import IExamRecordModel = require("./../domainmodel/IExamRecordModel");

interface IExamService extends IServiceBase<IExamRecordModel> {
    createExamRecord(examrecord: IExamRecordModel, callback: (error: any, result: any) => void): void;
    getQuestionsByType(categoryId: string, callback: (error: any, result: any) => void): void;
    getExamRecords(page: number, size: number, callback: (error: any, result: any) => void): void;
    getReviewRcord(examRecordId:string, callback: (error: any, result: any) => void): void;
}
export = IExamService;