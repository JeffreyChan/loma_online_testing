import _ = require('underscore');
import strUtility = require('underscore.string');

class Utilities {
    static Str = strUtility;
    static isNullorEmpty(entity: any): Boolean {
        return _.isNull(entity) || _.isEmpty(entity) || _.isUndefined(entity);
    }

}

export = Utilities;