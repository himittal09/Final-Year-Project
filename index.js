"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
if (dotenv_1.config().error) {
    console.error('\x1b[31m%s\x1b[0m', "Could not parse the config file for environment variables!");
    process.exit(1);
}
require("./config/config");
