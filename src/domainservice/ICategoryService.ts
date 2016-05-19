import IServiceBase = require("./IServiceBase");
import ICategoryModel = require("./../domainmodel/ICategoryModel");

interface ICategoryService extends IServiceBase<ICategoryModel> {
    getRootCategory: (isAppendChild: boolean, callback: (error: any, result: any) => void) => void;
}
export = ICategoryService;