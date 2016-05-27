import _ = require('underscore');
import strUtility = require('underscore.string');

class Utilities {
    static Str = strUtility;
    static isNullorEmpty(entity: any): Boolean {
        return _.isNull(entity) || _.isEmpty(entity) || _.isUndefined(entity);
    }

    static Extend(source: any, destination: any): any {
        return _.extend(source, destination);
    }

}

export = Utilities;