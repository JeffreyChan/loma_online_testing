var mongoose = require("mongoose");

var RepositoryBase = (function () {
    function RepositoryBase(schemaModel) {
        this._model = schemaModel;
    }
    RepositoryBase.prototype.create = function (item, callback) {
        this._model.create(item, callback);
    };

    RepositoryBase.prototype.retrieve = function (callback) {
        this._model.find({}, callback);
    };

    RepositoryBase.prototype.update = function (id, item, callback) {
        this._model.update({ _id: this.toObjectId(id) }, item, callback);
    };

    RepositoryBase.prototype.delete = function (id, callback) {
        this._model.remove({ _id: this.toObjectId(id) }, function (err) {
            return callback(err, null);
        });
    };

    RepositoryBase.prototype.findById = function (id, callback) {
        this._model.findById(id, callback);
    };

    RepositoryBase.prototype.toObjectId = function (id) {
        return mongoose.Types.ObjectId.createFromHexString(id);
    };
    return RepositoryBase;
})();

module.exports = RepositoryBase;
