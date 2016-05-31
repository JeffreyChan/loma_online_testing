import Promise = require('bluebird');
import _ = require("underscore");

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
        Promise.resolve(this._categoryRep.count())
            .then((count: number) => {
                if (count <= 0) {
                    throw new Error("no category found, please try other!");
                }
                totalCount = count;
                return this._categoryRep.getCategories(skip, size);
            })
            .then((catDataList: ICategoryModel[]) => {
                callback(null, {
                    totalNum: totalCount,
                    data: catDataList
                });
            }).catch((error: any) => {
                callback(error, null);
            });;
    }

    getChildCategories(callback: (error: any, result: any) => void): void {
        Promise.resolve(this._categoryRep.getChildCategories())
            .then((catList: ICategoryModel[]) => {
                if (Utilities.isNullorEmpty(catList)) {
                    throw new Error("no child categories found, please try other!");
                }
                let flatCatList = _.map(catList, (item: ICategoryModel) => {
                    return {
                        _id: item._id,
                        name: item.name,
                        parentname: item.parent.name
                    }
                });
                callback(null, flatCatList);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    createCategory(catEntity: ICategoryModel, callback: (error: any, result: any) => void) {
        let parentCat: ICategoryModel;
        let postEntity: ICategoryModel;
        let hasParentFlag: number = 0;
        Promise.resolve(this._categoryRep.findOne({ name: catEntity.name }))
            .then((cat: ICategoryModel) => {
                if (!Utilities.isNullorEmpty(cat)) {
                    throw new Error("the category name exists, please try other!");
                }

                let waitFor: any;
                if (!Utilities.isNullorEmpty(catEntity) && !Utilities.isNullorEmpty(catEntity.parent)) {
                    console.log("1.1 category'parent not empty, so find parent category!");
                    hasParentFlag = 1;
                    waitFor = this._categoryRep.findById(catEntity.parent);
                } else {
                    console.log("2.1 category'parent is empty, so create category!");
                    hasParentFlag = 0;
                    waitFor = this._categoryRep.create(catEntity);
                }
                return waitFor;
            })
            .then((cat: ICategoryModel) => {
                if (hasParentFlag === 1) {
                    console.log("1.2 find parent category done, now create category!");
                    parentCat = cat;
                    return this._categoryRep.create(catEntity);
                } else {
                    console.log("2.2 create category done!");
                    return cat;
                }
            })
            .then((cat: ICategoryModel) => {
                if (!Utilities.isNullorEmpty(parentCat)) {
                    console.log("1.3 create child category done, now update parent category");
                    return this._categoryRep.update(parentCat._id, { $push: { childrens: cat._id } });
                }
                console.log("2.3 return category, just for last step");
                postEntity = cat;
                return postEntity;
            })
            .then((catPutInfo: any) => {
                callback(null, postEntity);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    updateCategory(catEntity: ICategoryModel, callback: (error: any, result: any) => void) {
        let dbCat: ICategoryModel;
        Promise.resolve(this._categoryRep.findById(catEntity._id))
            .then((cat: ICategoryModel) => {
                if (!cat) {
                    throw new Error("can not find this category");
                }
                dbCat = cat;
                return this._categoryRep.update(dbCat._id, { name: catEntity.name, desc: catEntity.desc });
            })
            .then((updateInfo: any) => {
                dbCat = Utilities.Extend(dbCat, catEntity);
                callback(null, dbCat);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    removeCategory(catId: string, callback: (error: any, result: any) => void) {
        let dbCategory: ICategoryModel;
        let delInfo: any;
        let UpdateParentChildFlag = 0;
        Promise.resolve(this._categoryRep.findById(catId))
            .then((cat: ICategoryModel) => {
                if (!cat) {
                    throw new Error("can not find this category");
                }
                dbCategory = cat;
                return this._categoryRep.remove(catId);
            }).then((catDelInfo: any) => {
                delInfo = catDelInfo;
                let waitFor: any;
                if (!Utilities.isNullorEmpty(dbCategory.parent)) {
                    UpdateParentChildFlag = 1;
                    waitFor = this._categoryRep.update(dbCategory.parent, { $pull: { childrens: dbCategory._id } });   //delete child category 
                } else if (!Utilities.isNullorEmpty(dbCategory.childrens)) {
                    waitFor = this._categoryRep.removeCategoryList({ _id: { $in: dbCategory.childrens } }); //delete root category 
                }

                return waitFor;

            })
            .then((putOrdeleteInfo: any) => {
                callback(null, delInfo);
            })
            .catch((error: any) => {
                callback(error, null);
            });
    }

    getRootCategory(callback: (error: any, result: any) => void) {
        Promise.resolve(this._categoryRep.getRootCategory())
            .then((catList: ICategoryModel[]) => {
                callback(null, catList);
            }).catch((error: any) => {
                callback(error, null);
            });
    }
}


Object.seal(CategoryService);
export = CategoryService;