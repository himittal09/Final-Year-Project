//importing configurations files
require('./config/config');

//importing required packages installed by npm
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const compression = require('compression');
const morgan = require('morgan');
//passing the session as required by MongoStore
const MongoStore = require('connect-mongo')(session);

//creating router to use external routes
const router = express.Router();

//importing the mongoose with connection
const {mongoose} = require('./db/mongoose');

//creating an app by express
const app = express();

//usin application middlewares
app.use(compression());
app.use(morgan('combined'));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use(express.static(__dirname + '/Client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use( session ({
	name: 'connect.sid',
	httponly: true,
	secret : process.env.SESSION_KEY,
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//using external routes
app.use(require('./Routes/userRoutes'));
app.use(require('./Routes/adminRoutes'));
app.use(require('./Routes/examRoutes'));

//serving the home page
app.get('/', (request, response) => {
    response.send('Hello World!');
});

//listening the app
app.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`);
});

//exporting app for testing purpose
module.exports = app;