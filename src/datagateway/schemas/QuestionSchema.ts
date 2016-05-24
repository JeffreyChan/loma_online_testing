const uniqueValidator = require('mongoose-unique-validator');
import DataAccess = require("./../DataAccess");
import IQuestionModel = require("./../../domainmodel/IQuestionModel");

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;
let Schema = mongoose.Schema;

class QuestionSchema {
    static get schema() {
        let questionSchema = new Schema({
            category: { type: Schema.Types.ObjectId, ref: 'Category' },
            title: { type: String, index: 1, required: true, unique: true, dropDups: true },
            tip: { type: String },
            correct: { type: Schema.Types.ObjectId, ref: 'QuestionOption' },
            options: [{ type: Schema.Types.ObjectId, required: true, ref: 'QuestionOption' }],
            random: { type: [Number], default:  () => { return [Math.random(), Math.random()] }, index: '2d' },
            create_date: { type: Date, default: Date.now }
        }, { collection: 'questions' });
        questionSchema.plugin(uniqueValidator);
        return questionSchema;
    }
}


let schema = mongooseConnection.model<IQuestionModel>("Question", QuestionSchema.schema);

export = schema;