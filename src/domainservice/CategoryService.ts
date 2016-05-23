
/// <reference path="./../datagateway/repository/ICategoryRepository.ts" />
import CategoryRepository = require("./../datagateway/repository/CategoryRepository");
import ICategoryRepository = require("./../datagateway/repository/ICategoryRepository");
import ServiceBase = require("./ServiceBase");
import ICategoryService = require("./ICategoryService");
import ICategoryModel = require("./../domainmodel/ICategoryModel");

class CategoryService extends ServiceBase<ICategoryModel> implements ICategoryService {
    private _categoryRep: ICategoryRepository;

    constructor();
    constructor(categoryRep: ICategoryRepository = new CategoryRepository()) {
        super(categoryRep);
        this._categoryRep = categoryRep;
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
        }).catch(null, (error: any) => {
            callback(error, null);
        });
    }

    removeCategory(catId: string, callback: (error: any, result: any) => void) {
        var getEntity: ICategoryModel;
        var delInfo: any;
        Promise.resolve(this._categoryRep.findById(catId).then((getCat: ICategoryModel) => {
            if (!getCat) {
                throw new Error("can not find this category's parent");
            }
            return getCat;
        })).then((getCatTemp: ICategoryModel) => {
            getEntity = getCatTemp;
            return this._categoryRep.remove(catId);
        }).then((delInfoTemp: any) => {
            delInfo = delInfoTemp;
            if (getEntity.parent) {
                return this._categoryRep.update(getEntity.parent, { $pull: { childrens: getEntity._id } });
            }
            else {
                callback(null, delInfo);
            }

        }).then((putInfo: any) => {
            callback(null, delInfo);
        }).catch((error: any) => {
            callback(error, null);
        });
    }

    getRootCategory(isAppendChild: boolean, callback: (error: any, result: any) => void) {
        /*this._categoryRep.getRootCategory(isAppendChild).then((entity: any) => {
            if (entity) {
                callback(null, entity);
            } else {
                callback({error:"something wrong"}, null);
            }
        });*/
    }
}


Object.seal(CategoryService);
export = CategoryService;