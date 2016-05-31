import mongoose = require("mongoose");

import IExamRecordModel = require("./../../domainmodel/IExamRecordModel");
import ExamRecordSchema = require("./../schemas/ExamRecordSchema");
import RepositoryBase = require("./RepositoryBase");
import IExamRecordRepository = require("./IExamRecordRepository");

class ExamRecordRepository extends RepositoryBase<IExamRecordModel> implements IExamRecordRepository {
    private _dbcontext: mongoose.Model<mongoose.Document>;
    constructor();
    constructor(dbcontext: mongoose.Model<mongoose.Document> = ExamRecordSchema) {
        super(dbcontext);
        this._dbcontext = dbcontext;
    }
    
    getExamRecords(skip: number, limit: number): mongoose.Promise<IExamRecordModel[]>{
        return this._dbcontext.find({}, "-answerQuestions", { skip: skip, limit: limit, sort: "user" }).populate("category", "name").exec();
    }
}

Object.seal(ExamRecordRepository);
export = ExamRecordRepository;