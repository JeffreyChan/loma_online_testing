
import mongoose = require("mongoose");
import IRepositoryBase = require("./IRepositoryBase");
import IExamRecordModel = require("./../../domainmodel/IExamRecordModel");

interface IExamRecordRepository extends IRepositoryBase<IExamRecordModel>{ 
    getExamRecords(skip: number, limit: number): Promise<IExamRecordModel[]>;
} 

export = IExamRecordRepository;