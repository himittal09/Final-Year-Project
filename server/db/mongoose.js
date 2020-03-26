"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(function () {
    console.log('\x1b[32m%s\x1b[0m', "Successfully connected to database: " + process.env.DB);
}, function (error) {
    console.error('\x1b[31m%s\x1b[0m', "MongoDB connection error. Please make sure MongoDB is running. " + error);
    process.exit(1);
});
mongoose.set('useCreateIndex', true);
exports["default"] = mongoose;
