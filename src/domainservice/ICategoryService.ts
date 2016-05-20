import IServiceBase = require("./IServiceBase");
import ICategoryModel = require("./../domainmodel/ICategoryModel");

interface ICategoryService extends IServiceBase<ICategoryModel> {
    createCategory:(item: ICategoryModel, callback: (error: any, result: any) => void) => void;
    removeCategory: (id: string, callback: (error: any, result: any) => void) => void;
    getRootCategory: (isAppendChild: boolean, callback: (error: any, result: any) => void) => void;
}
export = ICategoryService;