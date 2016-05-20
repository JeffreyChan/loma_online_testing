import IEnityModel = require("./../domainmodel/IEntityModel");

interface IServiceBase<T extends IEnityModel> {
    /*
     read operation
 */
    retrieve: (callback: (error: any, result: any) => void) => void;
    findById: (id: string, callback: (error: any, result: T) => void) => void;

    /*
        write operation
    */
    create: (item: T, callback: (error: any, result: any) => void) => void;
    update: (id: string, item: any, callback: (error: any, result: any) => void) => void;
    remove: (id: string, callback: (error: any, result: any) => void) => void;
}
export = IServiceBase;