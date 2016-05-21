
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
        if (catEntity && catEntity.parent) {
            this._categoryRep.findById(catEntity.parent).then((getCat: ICategoryModel) => {
                if (!getCat) {
                    throw new Error("can not find this category's parent");
                }
                return getCat;
            }).then((getCat: ICategoryModel) => {
                parentCat = getCat;
                return this._categoryRep.create(catEntity);
            }).then((postCat: ICategoryModel) => {
                postEntity = postCat;
                return this._categoryRep.update(parentCat._id, { $push: { childrens: postEntity._id } });
            }).then((putInfo: any) => {
                callback(null, postEntity);
            }).then(null, (error: any) => {
                callback(error, null);
            });
        } else {
            this._categoryRep.create(catEntity).then((postCat: ICategoryModel) => {
                callback(null, postEntity);
            }).then(null, (error: any) => {
                callback(error, null);
            });
        }
    }

    removeCategory(catId: string, callback: (error: any, result: any) => void) {
        var getEntity: ICategoryModel;
        var delInfo: any;
        this._categoryRep.findById(catId).then((getCat: ICategoryModel) => {
            console.log(getCat);
            if (!getCat) {
                throw new Error("can not find this category's parent");
            }
            console.log("get category right");
            return getCat;
        }).then((getCatTemp: ICategoryModel) => {
            getEntity = getCatTemp;
            console.log("set category for delete");
            return this._categoryRep.remove(catId);
        }).then((delInfoTemp: any) => {
            delInfo = delInfoTemp;
            console.log("delete category right");
            if (getEntity.parent) {
                return this._categoryRep.update(getEntity.parent, { $pull: { childrens: getEntity._id } });
            }
            else {
                callback(null, delInfo);
            }

        }).then((putInfo: any) => {
            callback(null, delInfo);
        }).then(null, (error: any) => {
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