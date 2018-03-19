import Mongoose = require("mongoose");
import DataAccess = require("./../DataAccess");
import IExamRecordModel = require("./../../domainmodel/IExamRecordModel");

let Schema = Mongoose.Schema;
let mongooseConnection = DataAccess.mongooseConnection;


class ExamRecordSchema {
    static get schema() {
        let questionSchema = new Schema({
            user: { type: String, index: true, required: true, unique: true, dropDups: true },
            right: { type: Number },
            wrong: { type: Number },
            category: { type: Schema.Types.ObjectId, index: true, ref: 'Category' },
            answerQuestions: [
                {
                    Q: {
                        type: Schema.Types.ObjectId,
                        required: true,
                        index: '2d',
                        ref: 'Question'
                    },
                    A: {
                        type: Schema.Types.ObjectId,
                        required: true,
                        index: '2d',
                        ref: 'QuestionOption'
                    }
                }],
            create_date: { type: Date, default: Date.now }
        }, { collection: 'examrecords' });
        return questionSchema;
    }
}


let schema = mongooseConnection.model<IExamRecordModel>("ExamRecord", ExamRecordSchema.schema);

export = schema;