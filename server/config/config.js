var config = {
    test: {
        PORT: 3000,
        DB: 'FinalYearAppTest',
        MONGODB_URI: 'mongodb://localhost:27017/FinalYearAppTest',
        SESSION_KEY: process.env.DEV_SESSION_KEY
    },
    development: {
        PORT: 3000,
        DB: 'FinalYearApp',
        MONGODB_URI: 'mongodb://localhost:27017/FinalYearApp',
        SESSION_KEY: process.env.DEV_SESSION_KEY
    },
    production: {
        PORT: process.env.PROD_PORT || 3000,
        DB: process.env.PROD_DB || 'FinalYearApp',
        MONGODB_URI: process.env.PROD_MONGODB_URI || 'mongodb://localhost:27017/FinalYearApp',
        SESSION_KEY: process.env.PROD_SESSION_KEY || 'supersecret'
    }
};
var env = process.env.NODE_ENV || 'development';
if (env === 'development' || env === 'test') {
    var envConfig_1 = config[env];
    Object.keys(envConfig_1).forEach(function (key) {
        process.env[key] = envConfig_1[key];
    });
}
