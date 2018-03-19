import Mongoose = require("mongoose");
import DataAccess = require("./../DataAccess");
import IQuestionModel = require("./../../domainmodel/IQuestionModel");

let Schema = Mongoose.Schema;
let mongooseConnection = DataAccess.mongooseConnection;

class QuestionSchema {
    static get schema() {
        let questionSchema = new Schema({
            category: { type: Schema.Types.ObjectId, ref: 'Category' },
            title: { type: String, required: true, unique: true, dropDups: true },
            tip: { type: String },
            correct: { type: Schema.Types.ObjectId, ref: 'QuestionOption' },
            options: [{ type: Schema.Types.ObjectId, required: true,  index: '2d', ref: 'QuestionOption' }],
            random: { type: [Number], default:  () => { return [Math.random(), Math.random()] }, index: '2d' },
            create_date: { type: Date, default: Date.now }
        }, { collection: 'questions' });
        return questionSchema;
    }
}


let schema = mongooseConnection.model<IQuestionModel>("Question", QuestionSchema.schema);

export = schema;