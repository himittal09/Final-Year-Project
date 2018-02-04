//importing student model from models folder
const {Student} = require('../models');

//creating a authenticate function to be used as a reference, for private route
//will check if the user (admin or student) is authenticated, will be executed before the actual route
const authenticate = (request, response, next) => {
    
    // if the admin is not authenticated, send empty response with Unauthorised status code
    if (!request.session.isAuthenticated) return response.status(401).send();

    //if the authenticated user is admin, finish route with return keyword, by calling next function
    if (request.session.userLevel == 0) return next();
            
    // if here, authenticated user is student, find the student via its id
    // finding user with id attached to the session
    Student.findById(request.session.userId).then((student) => {
        //if student is found, saving the student in response
        request.student = student;
        //calling next to finish execution of route
        next();

        // on error call sening back error with Not Implemented status code
    }, (error) => response.status(501).send(error));
    
    //function ends here
};

//exporting the function to be used in routes
module.exports = {authenticate};