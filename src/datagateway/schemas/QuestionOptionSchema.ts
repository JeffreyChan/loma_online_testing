import Mongoose = require("mongoose");
import DataAccess = require("./../DataAccess");
import IQuestionOptionModel = require("./../../domainmodel/IQuestionOptionModel");

let Schema = Mongoose.Schema;
let mongooseConnection = DataAccess.mongooseConnection;

class QuestionOptionSchema {
  static get schema() {
    let optionSchema = new Schema({
      answer: { type: String, index: true, required: true },
      isCorrect: Boolean,
      create_date: { type: Date, default: Date.now }
    }, { collection: 'questionOptions' });
    return optionSchema;
  }
}

let schema = mongooseConnection.model<IQuestionOptionModel>("QuestionOption", QuestionOptionSchema.schema);

export = schema;