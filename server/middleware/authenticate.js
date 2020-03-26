"use strict";
exports.__esModule = true;
var models_1 = require("../models");
function authenticate(request, response, next) {
    if (!request.session.isAuthenticated) {
        return response.status(401).send();
    }
    models_1.User.findById(request.session.userId).then(function (user) {
        request['user'] = user;
        next();
    }, function (error) { return response.status(501).send(error); });
}
exports.authenticate = authenticate;
