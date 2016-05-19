var DataAccess = require("./../DataAccess");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var Schema = mongoose.Schema;

var CategorySchema = (function () {
    function CategorySchema() {
    }
    Object.defineProperty(CategorySchema, "schema", {
        get: function () {
            return new mongoose.Schema({
                name: { type: String, index: 1, required: true, unique: true },
                desc: { type: String },
                parent: { type: Schema.Types.ObjectId, ref: 'Category' },
                childrens: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
                create_date: { type: Date, default: Date.now }
            }, { collection: 'categories' });
        },
        enumerable: true,
        configurable: true
    });
    return CategorySchema;
})();

var schema = mongooseConnection.model("Category", CategorySchema.schema);

module.exports = schema;
