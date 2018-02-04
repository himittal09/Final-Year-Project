//importing required packages installed by npm
const mongoose = require('mongoose');

//for deprecated mongoose Promise
mongoose.Promise = global.Promise;

//connecting to the database, as database uri set in Environment variable
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true}).then(() => {
    //success case
    console.log('Successfully connected to database: ' + process.env.DB);
    //error case
}, (error) => console.error(error));

//exporting mongoose with the connection
module.exports = mongoose;