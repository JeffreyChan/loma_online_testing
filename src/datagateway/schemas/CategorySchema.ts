import DataAccess = require("./../DataAccess");
import ICategory = require("./../../domainmodel/ICategoryModel");

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;
let Schema = mongoose.Schema;

class CategorySchema {
    static get schema() {
        let catSchema =  new Schema({
            name: { type: String, index: 1, required: true, unique: true },
            desc: { type: String },
            parent: { type: Schema.Types.ObjectId, ref: 'Category' },
            childrens: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
            create_date: { type: Date, default: Date.now }
        }, { collection: 'categories' });
        return catSchema;
    }
}

let schema = mongooseConnection.model<ICategory>("Category", CategorySchema.schema);

export = schema;