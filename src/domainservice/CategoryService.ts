
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

    createCategory(item: ICategoryModel, callback: (error: any, result: any) => void) {
        //step 1 check item has parent
        var msg = {
            "message": "",
            "statescode": 200,
            "error": null
        };
        if (item && item.parent) {
            super.findById(item.parent, (getError: any, getEntity: any) => {
                if (getError) {
                    msg.message = "can't find parent:" + item.parent;
                    msg.statescode = 404;
                    msg.error = getError;
                    callback(msg, null);
                }
                else {
                    if (!getEntity) {
                        msg.message = "can't find category: " + item.name;
                        msg.statescode = 404;
                        callback(msg, null);
                        return;
                    }
                    //step 2 create item
                    super.create(item, (postError: any, postEntity: any) => {
                        if (postError) {
                            msg.message = "can't create this item:" + item.name;
                            msg.statescode = 500;
                            msg.error = postError;
                            callback(msg, null);
                        } else {
                            //step 3 update parent child
                            super.update(item.parent, { $push: { childrens: postEntity._id } }, (putError: any, putEntity: any) => {
                                if (putError) {
                                    msg.message = "can't update this item:" + item.name;
                                    msg.statescode = 500;
                                    msg.error = putError;
                                    callback(msg, null);
                                }
                                else {
                                    callback(null, postEntity);
                                }
                            });
                        }
                    });
                }
            });
        }
        else {
            super.create(item, callback);
        }
    }

    removeCategory(catId: string, callback: (error: any, result: any) => void) {
        var msg = {
            "message": "",
            "statescode": 200,
            "error": null
        };
        console.log("find category");
        if (catId) {
            super.findById(catId, (getError: any, getEntity: any) => {
                if (getError) {
                    msg.message = "can't find this item: " + catId;
                    msg.statescode = 404;
                    msg.error = getError;
                    callback(msg, null);
                } else {
                    console.log("find category");
                    super.remove(catId, (delError: any, delEntity: any) => {
                        if (delError) {
                            msg.message = "something wrong with remove this category: " + getEntity.name;
                            msg.statescode = 400;
                            msg.error = delError;
                            callback(msg, null);
                        }
                        else {
                            if (getEntity.parent) {
                                var parentId = getEntity.parent;
                                
                                super.update(parentId, { $pull: { childrens: getEntity._id } }, (putError: any, putEntity: any) => {
                                    if (putError) {
                                        msg.message = "can't update this item:" + item.name;
                                        msg.statescode = 500;
                                        msg.error = putError;
                                        callback(msg, null);
                                    }
                                    else {
                                        callback(null, getEntity);
                                    }
                                });
                            } else {
                                callback(null, getEntity);
                            }
                        }
                    });
                }
            });
        }
        else {
            msg.message = "entityId can't be empty!";
            msg.statescode = 400;
            callback(msg, null)
        }
    }

    getRootCategory(isAppendChild: boolean, callback: (error: any, result: any) => void) {
        this._categoryRep.getRootCategory(isAppendChild, callback);
    }
}


Object.seal(CategoryService);
export = CategoryService;