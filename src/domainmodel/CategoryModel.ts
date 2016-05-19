import mongoose = require('mongoose');
import ICategoryModel = require("./ICategoryModel");

class CategoryModel {

    private _category: ICategoryModel;

    constructor(categoryModel: ICategoryModel) {
        this._category = categoryModel;
    }
    get id(): any {
        return this._category._id;
    }
    get name(): string {
        return this._category.name;
    }

    get desc(): string {
        return this._category.desc;
    }

    get parent(): any {
        return this._category.parent;
    }

    get childrens(): any[] {
        return this._category.childrens;
    }

    get create_date(): Date {
        return this._category.create_date;
    }
}
Object.seal(CategoryModel);

export = CategoryModel;