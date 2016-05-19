interface IServiceBase<T> {
    /*
     read operation
 */
    retrieve: (callback: (error: any, result: any) => void) => void;
    findById: (id: string, callback: (error: any, result: T) => void) => void;

    /*
        write operation
    */
    create: (item: T, callback: (error: any, result: any) => void) => void;
    update: (id: string, item: T, callback: (error: any, result: any) => void) => void;
    delete: (id: string, callback: (error: any, result: any) => void) => void;
}
export = IServiceBase;