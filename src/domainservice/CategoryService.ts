import Promise = require('bluebird');

import CategoryRepository = require("./../datagateway/repository/CategoryRepository");
import ICategoryRepository = require("./../datagateway/repository/ICategoryRepository");
import ServiceBase = require("./ServiceBase");
import ICategoryService = require("./ICategoryService");
import ICategoryModel = require("./../domainmodel/ICategoryModel");

import Utilities = require("./../domainmodel/Utilities");


class CategoryService extends ServiceBase<ICategoryModel> implements ICategoryService {
    private _categoryRep: ICategoryRepository;

    constructor();
    constructor(categoryRep: ICategoryRepository = new CategoryRepository()) {
        super(categoryRep);
        this._categoryRep = categoryRep;
    }

    getCategories(page: number, size: number, callback: (error: any, result: any) => void): void {
        let totalCount: number = 0;
        let skip: number = ((page - 1) * size);
        Promise.resolve(this._categoryRep.count().then((totalNum: number) => {
            if (totalNum <= 0) {
                throw new Error("no category found, please try other!");
            }
            totalCount = totalNum;
            return totalNum;
        })).then((count: number) => {
            return this._categoryRep.getCategories(skip, size);
        }).then((catDataList: ICategoryModel[]) => {
            callback(null, {
                totalNum: totalCount,
                data: catDataList
            });
        }).catch((error: any) => {
            callback(error, null);
        });;
    }
    createCategory(catEntity: ICategoryModel, callback: (error: any, result: any) => void) {
        var parentCat: ICategoryModel;
        var postEntity: ICategoryModel;
        Promise.resolve(this._categoryRep.retrieve({ name: catEntity.name }).then((catList: ICategoryModel[]) => {
            if (catList && catList.length > 0) {
                throw new Error("the category name exists, please try other!");
            }
            return catList;
        })).then((catList: ICategoryModel[]) => {

            if (catEntity && catEntity.parent) {
                return this._categoryRep.findById(catEntity.parent);
            } else {
                return this._categoryRep.create(catEntity);
            }
        }).then((cat: ICategoryModel) => {
            if (cat.childrens.length > 0) {
                parentCat = cat;
                return this._categoryRep.create(catEntity);
            } else {
                callback(null, cat);
                return null;
            }
        }).then((cat: ICategoryModel) => {
            if (!cat) {
                return null;
            }
            postEntity = cat;
            return this._categoryRep.update(parentCat._id, { $push: { childrens: postEntity._id } });
        }).then((cat: ICategoryModel) => {
            if (!cat) {
                return null;
            }
            callback(null, postEntity);
        }).catch((error: any) => {
            callback(error, null);
        });
    }

    updateCategory(catEntity: ICategoryModel, callback: (error: any, result: any) => void) {
        let dbCat: ICategoryModel;
        Promise.resolve(this._categoryRep.findById(catEntity._id).then((getCat: ICategoryModel) => {
            if (!getCat) {
                throw new Error("can not find this category");
            }
            return getCat;
        })).then((cat: ICategoryModel) => {
            dbCat = cat;
            return this._categoryRep.update(dbCat._id, { name: catEntity.name, desc: catEntity.desc });
        }).then((updateInfo: any) => {
            dbCat = Utilities.Extend(dbCat, catEntity);
            callback(null, dbCat);
        }).catch((error: any) => {
            callback(error, null);
        });
    }

    removeCategory(catId: string, callback: (error: any, result: any) => void) {
        let getEntity: ICategoryModel;
        let delInfo: any;
        let UpdateParentChildFlag = 0;
        Promise.resolve(this._categoryRep.findById(catId).then((getCat: ICategoryModel) => {
            if (!getCat) {
                throw new Error("can not find this category");
            }
            return getCat;
        })).then((getCatTemp: ICategoryModel) => {
            getEntity = getCatTemp;
            return this._categoryRep.remove(catId);
        }).then((delInfoTemp: any) => {
            delInfo = delInfoTemp;
            if (!Utilities.isNullorEmpty(getEntity.parent)) {
                UpdateParentChildFlag = 1;
                return this._categoryRep.update(getEntity.parent, { $pull: { childrens: getEntity._id } });
            } else if (!Utilities.isNullorEmpty(getEntity.childrens)) {
                UpdateParentChildFlag = 2;
            } else {
                callback(null, delInfo);
            }

        }).then((putInfo: any) => {
            if (UpdateParentChildFlag === 2) {
                return this._categoryRep.removeCategoryList({ _id: { $in: getEntity.childrens } });
            } else {
                callback(null, delInfo);
            }

        }).then((childList: ICategoryModel[]) => {
            console.log(childList);
            callback(null, delInfo);
        }).catch((error: any) => {
            callback(error, null);
        });
    }

    getRootCategory(callback: (error: any, result: any) => void) {
        Promise.resolve(this._categoryRep.getRootCategory().then((catList: ICategoryModel[]) => {
            return catList;
        })).then((catList: ICategoryModel[]) => {
            callback(null, catList);
        }).catch((error: any) => {
            callback(error, null);
        });
    }
}


Object.seal(CategoryService);
export = CategoryService;