var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ControllerBase = require("./ControllerBase");
var CategoryService = require("./../../../domainservice/CategoryService");

var CategoryController = (function (_super) {
    __extends(CategoryController, _super);
    function CategoryController() {
        _super.call(this, new CategoryService());
    }
    return CategoryController;
})(ControllerBase);

Object.seal(CategoryController);
module.exports = CategoryController;
