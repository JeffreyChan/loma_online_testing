import IServiceBase = require("./IServiceBase");
import ICategoryModel = require("./../domainmodel/ICategoryModel");

interface ICategoryService extends IServiceBase<ICategoryModel> {
    createCategory:(item: ICategoryModel, callback: (error: any, result: any) => void) => void;
    updateCategory:(item: ICategoryModel, callback: (error: any, result: any) => void) => void;
    removeCategory: (id: string, callback: (error: any, result: any) => void) => void;
    getRootCategory: (callback: (error: any, result: any) => void) => void;
    getCategories: (page:number, size:number, callback: (error: any, result: any) => void) => void;
    getChildCategories: (callback: (error: any, result: any) => void) => void;
}
export = ICategoryService;