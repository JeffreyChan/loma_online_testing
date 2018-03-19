import Mongoose = require("mongoose");
import DataAccess = require("./../DataAccess");
import ICategory = require("./../../domainmodel/ICategoryModel");

let Schema = Mongoose.Schema;
let mongooseConnection = DataAccess.mongooseConnection;


class CategorySchema {
    static get schema() {
        let catSchema = new Schema({
            name:  { type: String, index: true, required: true, unique: true },
            parent: { type: Schema.Types.ObjectId, ref: 'Category' },
            childrens: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
            create_date: { type: Date, default: Date.now }
        },{ collection: 'categories' });
        return catSchema;
    }
}

let schema = mongooseConnection.model<ICategory>("Category", CategorySchema.schema);

export = schema;