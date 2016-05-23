const uniqueValidator = require('mongoose-unique-validator');
import DataAccess = require("./../DataAccess");
import IQuestionOptionModel = require("./../../domainmodel/IQuestionOptionModel");

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;
let Schema = mongoose.Schema;

class QuestionOptionSchema {
  static get schema() {
    let optionSchema = new Schema({
      answer: { type: String, index: 1, required: true },
      isCorrect: Boolean,
      create_date: { type: Date, default: Date.now },
    }, { collection: 'questionOptions' });
    optionSchema.plugin(uniqueValidator);
    return optionSchema;
  }
}

let schema = mongooseConnection.model<IQuestionOptionModel>("QuestionOption", QuestionOptionSchema.schema);

export = schema;