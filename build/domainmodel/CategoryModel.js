var CategoryModel = (function () {
    function CategoryModel(categoryModel) {
        this._category = categoryModel;
    }
    Object.defineProperty(CategoryModel.prototype, "id", {
        get: function () {
            return this._category._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryModel.prototype, "name", {
        get: function () {
            return this._category.name;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CategoryModel.prototype, "desc", {
        get: function () {
            return this._category.desc;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CategoryModel.prototype, "parent", {
        get: function () {
            return this._category.parent;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CategoryModel.prototype, "childrens", {
        get: function () {
            return this._category.childrens;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CategoryModel.prototype, "create_date", {
        get: function () {
            return this._category.create_date;
        },
        enumerable: true,
        configurable: true
    });
    return CategoryModel;
})();
Object.seal(CategoryModel);

module.exports = CategoryModel;
