var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CategorySchema = require("./../schemas/CategorySchema");
var RepositoryBase = require("./RepositoryBase");

var CategoryRepository = (function (_super) {
    __extends(CategoryRepository, _super);
    function CategoryRepository() {
        _super.call(this, CategorySchema);
    }
    CategoryRepository.prototype.getRootCategory = function (isAppendChild, callback) {
        if (isAppendChild) {
            this._model.find({ parent: null }).populate("childrens").exec(callback);
        } else {
            this._model.find({ parent: null }, callback);
        }
    };
    return CategoryRepository;
})(RepositoryBase);

Object.seal(CategoryRepository);
module.exports = CategoryRepository;
