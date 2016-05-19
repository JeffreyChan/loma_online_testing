var Constants = (function () {
    function Constants() {
    }
    Constants.DB_CONNECTION_STRING = "mongodb://localhost/loma";
    return Constants;
})();
Object.seal(Constants);
module.exports = Constants;
