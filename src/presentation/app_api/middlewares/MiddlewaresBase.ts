import express = require("express");
import bodyParser = require("body-parser");
import logger = require("morgan");

import MethodOverride = require("./MethodOverride");
import RoutesBase = require("./../routes/RoutesBase");


class MiddlewaresBase {

    static get configuration() {
        var app = express();
        app.use(logger("dev"));
        app.use(bodyParser.json());
        app.use(MethodOverride.configuration());
        app.use(new RoutesBase().routes);

        console.log(app.get('env'));
        //app.use(MiddlewaresBase.logErrors);
        //app.use(MiddlewaresBase.clientErrorHandler);
        app.use(MiddlewaresBase.errorHandler);
        return app;
    }

    private static logErrors(err, req, res, next) {
        console.error(err.stack);
        next(err);
    }

    //define an error-handler for requests made by using XHR
    private static clientErrorHandler(err, req, res, next) {
        if (req.xhr) {
            res.status(500).send({ error: 'Something failed!' });
        } else {
            next(err);
        }
    }

    //catch-all errorHandler
    private static errorHandler(err, req, res, next) {
        res.status(500);
        res.json({
            message: err.message,
            error: err.stack
        });
    }
}
Object.seal(MiddlewaresBase);
export = MiddlewaresBase;