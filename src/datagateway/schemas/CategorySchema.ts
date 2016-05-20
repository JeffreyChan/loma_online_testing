var uniqueValidator = require('mongoose-unique-validator');
import DataAccess = require("./../DataAccess");
import ICategory = require("./../../domainmodel/ICategoryModel.ts");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var Schema = mongoose.Schema;

class CategorySchema {
    static get schema() {
        var catSchema =  mongoose.Schema({
            name: { type: String, index: 1, required: true, unique: true },
            desc: { type: String },
            parent: { type: Schema.Types.ObjectId, ref: 'Category' },
            childrens: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
            create_date: { type: Date, default: Date.now },
        }, { collection: 'categories' });
        catSchema.plugin(uniqueValidator);
        return catSchema;
    }
}

var schema = mongooseConnection.model<ICategory>("Category", CategorySchema.schema);

export = schema;