var ServiceBase = (function () {
    function ServiceBase(repository) {
        this._repository = repository;
    }
    ServiceBase.prototype.create = function (item, callback) {
        this._repository.create(item, callback);
    };

    ServiceBase.prototype.retrieve = function (callback) {
        this._repository.retrieve(callback);
    };

    ServiceBase.prototype.update = function (id, item, callback) {
        var _this = this;
        this._repository.findById(id, function (err, res) {
            if (err) {
                callback(err, res);
            } else {
                _this._repository.update(res._id, item, callback);
            }
        });
    };

    ServiceBase.prototype.delete = function (id, callback) {
        this._repository.delete(id, callback);
    };

    ServiceBase.prototype.findById = function (id, callback) {
        this._repository.findById(id, callback);
    };
    return ServiceBase;
})();

module.exports = ServiceBase;
