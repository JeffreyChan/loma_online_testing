var ControllerBase = (function () {
    function ControllerBase(service) {
        this._service = service;
    }
    ControllerBase.prototype.create = function (req, res) {
        try  {
            var item = req.body;
            this._service.create(item, function (error, result) {
                if (error) {
                    res.send({ "error": "error" });
                } else {
                    res.send({ "success": "success" });
                }
            });
        } catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };

    ControllerBase.prototype.findById = function (req, res) {
        try  {
            var catId = req.params.id;
            console.log("test here:");
            console.log(JSON.stringify(this));
            this._service.findById(catId, function (error, result) {
                if (error) {
                    res.send({ "error": error });
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    return ControllerBase;
})();

module.exports = ControllerBase;
