var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="./../datagateway/repository/ICategoryRepository.ts" />
var CategoryRepository = require("./../datagateway/repository/CategoryRepository");

var ServiceBase = require("./ServiceBase");

var CategoryService = (function (_super) {
    __extends(CategoryService, _super);
    function CategoryService(categoryRep) {
        if (typeof categoryRep === "undefined") { categoryRep = new CategoryRepository(); }
        _super.call(this, categoryRep);
        this._categoryRep = categoryRep;
    }
    CategoryService.prototype.getRootCategory = function (isAppendChild, callback) {
        this._categoryRep.getRootCategory(isAppendChild, callback);
    };
    return CategoryService;
})(ServiceBase);

Object.seal(CategoryService);
module.exports = CategoryService;
