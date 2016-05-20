
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

    /* doAddCategory(item: ICategoryModel, parent: ICategoryModel, callback: (error: any, result: any) => void) {
         this._categoryRep.create(item, (error: any, result: any) => {
             let msg = {
                 "message": "",
                 "statescode": 200,
                 "error": null
             }
             if (error) {
                 msg.message = "can't create this item:" + item.name;
                 msg.statescode = 500;
                 msg.error = error;
                 callback(msg, null);
             } else {
                 parent.childrens.push(result);
                 this.updateChildren(parent, callback);
             }
         });
     }
 
     updateChildren(parent: ICategoryModel, callback: (error: any, result: any) => void) {
         this._categoryRep.update(parent._id, parent, callback)
     }*/

    createCategory(item: ICategoryModel, callback: (error: any, result: any) => void) {
        //step 1 check item has parent
        var msg = {
            "message": "",
            "statescode": 200,
            "error": null
        };
        if (item && item.parent) {
            super.findById(item.parent, (error: any, result: any) => {
                if (error) {
                    msg.message = "can't find parent:" + item.parent;
                    msg.statescode = 404;
                    msg.error = error;
                    callback(msg, null);
                }
                else {
                    if (!result) {
                        msg.message = "can't find category: " + item.name;
                        msg.statescode = 404;
                        msg.error = error;
                        callback(msg, null);
                        return;
                    }
                    //step 2 create item
                    var parent = result;

                    super.create(item, (createError: any, createEntity: any) => {
                        if (createError) {
                            msg.message = "can't create this item:" + item.name;
                            msg.statescode = 500;
                            msg.error = createError;
                            callback(msg, null);
                        } else {
                            //step 3 update parent child
                            parent.childrens.push(createEntity);
                            super.update(parent._id, parent, (updateError: any, updateEntity: any) => {
                                if (updateError) {
                                    msg.message = "can't update this item:" + item.name;
                                    msg.statescode = 500;
                                    msg.error = updateError;
                                    callback(msg, null);
                                }
                                else {
                                    callback(null, createEntity);
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

    removeCategory(id: string, callback: (error: any, result: any) => void) {
        var msg = {
            "message": "",
            "statescode": 200,
            "error": null
        };
        if (id) {
            super.findById(id, (getError: any, getEntity: any) => {
                if (getError) {
                    msg.message = "can't find this item: " + id;
                    msg.statescode = 404;
                    msg.error = getError;
                    callback(msg, null);
                } else {
                    console.log("find category");
                    super.remove(id, (delError: any, delEntity: any) => {
                        if (delError) {
                            msg.message = "something wrong with remove this category: " + getEntity.name;
                            msg.statescode = 400;
                            msg.error = delError;
                            callback(msg, null);
                        }
                        else {
                            console.log("remove category");
                            if (getEntity.parent) {
                                var parentId = getEntity.parent;
                                super.update(parentId, { $pull: { childrens: [id] } }, (updateError: any, updateEntity: any) => {
                                    if (updateError) {
                                        msg.message = "can't update this item:" + item.name;
                                        msg.statescode = 500;
                                        msg.error = updateError;
                                        callback(msg, null);
                                    }
                                    else {
                                        console.log("update category");
                                        console.log(updateEntity);
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