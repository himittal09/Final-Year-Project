//importing required packages installed by npm
const _ = require('lodash');
const express = require('express');

//making router from express to make this route available to main index.js file
const router = express.Router();

//requiring mngoose and pulling out ObjectId from it for validations
const ObjectId = require('mongoose').Types.ObjectId;

//importing middleware from middleware directory to authenticate students
const {authenticate} = require('../middleware/authenticate');
const {userAuthenticate} = require('../middleware/userAuthenticate');
const { mergeArrays } = require('../middleware/methods');

//importing models from models directory
const {ExamReturn} = require('../models/examReturn');
const {QuestionAnswer} = require('../models/questionAnswer');
const {Exam} = require('../models/exam');

const {AggregateExamResult} = require('../models/aggregateExamResult');
const { AggregateExamQuestionAnalysis } = require('../models/aggregateExamQuestionAnalysis');

/***********************************************************
 * This route is used to get full details about an exam
 * when user is about to start exam, he fetches all exam details from here
 * this route is private, only authentiated users (students) can access this route
 */
router.get('/exam/:id', userAuthenticate, (request, response) => {
    
    //fetching the examID from the request parameter
    var id = request.params.id;

    /* Checking if the id is valid or not */
    if (!ObjectId.isValid(id))
        //if invalid, responsing with text and Bad Request status code
        return response.status(400).send('Invalid Exam ID');

    //fetching the exam from database, and fetching the questions with it
    Exam.findById(id).populate('questions').exec((error, exam) => {

        //if error occurs, sending back error with Internal Server error status code
        if (error) return response.status(500).send(error);
        
        //if there is no exam in database with the id, sending emty response back with Not Found status code
        if (!exam) return response.status(404).send();

        //picking only required properties, leaving other properties
        var body = _.pick(exam, ['name', 'description', 'allowedTime', 'subject', 'createdAt', '_id']);

        //mapping the questions and assigning manually picked questions into the body to send back
        body.questions = exam.questions.map((question) => _.pick(question, ['body', 'answerOptionOne', 'answerOptionTwo', 'answerOptionThree', 'answerOptionFour', 'marksForCorrectAnswer', 'negativeMark', '_id']));

        //sending the exam back to the client
        response.send(body);
    });
    //route finishes here
});
/******************************************************************************************************** */

/*******************************************************
 * This route is used when user wishes to get a list of all exams
 * This route will return exams sorted in descending order date wise
 * This is a private route, only authenticated users can use this route
 */
router.get('/exam', authenticate, (request, response) => {

    //finding all exams descending date order wise
    Exam.find({}).select('name description allowedTime subject createdAt _id').sort('-date').exec((error, exams) => {

        //if error occurs, sending back error with Internal Server error status code
        if (error) return response.status(500).send(error);

        //if there is no exam in database, sending emty response back with Not Found status code
        if (!exams.length) return response.status(404).send();

        // if authenticated user is admin, not attacking the hasUserAttempted attribute on exams
        // simply mapping th exam and sending back exam as response
        if (request.session.userLevel == 0)
            return response.send(exams);

        //finding that user has attempted how many exams here
        ExamReturn.find({user: request.session.userId}).select('exam -_id').exec((error, examReturns) => {

            // checking for any potential error here, and replying with Internal server error status code
            if (error) return response.status(500).send(error);

            // if user hasn't attempted any exam, sending the exams back as response
            if (!examReturns.length) {
                return response.send({exams, examReturns: []});
            }

            //sending the exam back to the client
            // mappping the exam return data to an array from an array of objects
            response.send({
                exams,
                examReturns: examReturns.map((examReturn) => examReturn.exam)
            });

        });

    });
    //route finishes here
});
/******************************************************************************************************** */

/**
 * This route is used to get exam's quick results or exam returns
 * This is a private route, only authenticated users can access this route
 */
router.get('/exam/quick/:id', userAuthenticate, (request, response) => {

    //fetching the examID from the request parameter
    var id = request.params.id;
    
    /* Checking if the id is valid or not */
    if (!ObjectId.isValid(id))
        //if invalid, responsing with text and Bad Request status code
        return response.status(400).send('Invalid Exam ID');

    //finding the examreturn data from database and fetching all question answers too with it
    ExamReturn.findOne({exam: id, user: request.student._id}).populate('questionAnswers').exec((error, examReturn) => {

        // handling any potential error that may occur
        // sending error with Internal Server error status code
        if (error) return response.status(500).send(error);

        // if no exam return, it means that exam was not able to get saved in the database successfully
        // responding with Not Found status code
        if (!examReturn) return response.status(404).send();

        // sending the examreturn data back to the client
        response.send(examReturn);

    });
    
    //route finished here
});
/******************************************************************************************************** */

/**
 * This route will be used when user submits a exam
 * This route is private, only authenticated users can access this route
 */
router.post('/exam/submit/:id', userAuthenticate, (request, response) => {

    //fetching the examID from the request parameter
    var id = request.params.id;

    // Checking if the id is valid or not
    if (!ObjectId.isValid(id))
        //if invalid, responsing with text and Bad Request status code
        return response.status(400).send('Invalid Exam ID');

    // mapping users's input to be saved in database with correct information
    var answers = request.body.questionAnswers.map(questionAnswer => {
        return { 
            exam: id,
            question: questionAnswer.question,
            timeTaken: questionAnswer.timeTaken,
            answerSubmitted: questionAnswer.answerSubmitted
        };
    });

    //creating new examReturn to save the user's response for the exam
    var examReturn = new ExamReturn({
        exam: id,
        user: request.student._id,
        totalTimeTaken: request.body.totalTimeTaken,
        totalQuestionAttempted: answers.length
    });
    
    // if user has not submitted any answer, saving the exam return as no further calculation is
    // needed to be done
    if (!answers.length) {
        // saving exam in database
        return examReturn.save().then(() => {

            //responsing back as exam successfully stored in database
            response.send('Exam Successfully submitted in Store');

            //Handing any potential errors, sending error to client with the Internal Server error status code
        }, (error) => response.status(500).send(error));
    }

    //saving all the answers to questions in the database in one function, but one by one
    QuestionAnswer.create(answers, (error, questionAnswers) => {

        //if error occurs, sending back error with Internal Server error status code
        if (error) return response.status(500).send(error);
        
        questionAnswers.forEach(questionAnswer => {

            // calculating the total marks obtained for the exam and pushing each answer id into examRetrun object
            examReturn.questionAnswers.push(questionAnswer._id);
            examReturn.marksObtained += questionAnswer.marksObtained;

            // finding question analysis documents one by one (question wise) to create make analysis and update the document with latest analysis
            AggregateExamQuestionAnalysis.findOne({exam: id, question: questionAnswer.question}).exec((error, aggregateExamQuestionAnalysis) => {
                
                // if error occures or the document seeding is not done properly, returning, as the documnets are seeded with zeroes
                if (error) return console.error(error);

                if (!aggregateExamQuestionAnalysis) return console.error('couldnot find seed data');

                aggregateExamQuestionAnalysis.calculateComparableQuestionDataByDocument().then((doc) => console.log('Aggregate being calculated')).catch(error => console.error(error));

            });
        });

        // saving exam in database
        examReturn.save().then(() => {

            //responsing back as exam successfully stored in database
            response.send('Exam Successfully submitted in Store');

            //Handing any potential errors, sending error to client with the Internal Server error status code
        }, (error) => response.status(500).send(error));

    });

    // route finished here
});
/********************************************************************************************************* */

/************************************************************
 * this route is used then user wishes to fetch results for an exam, passed as query parameter
 * this route is private, only authenticated users can use this route
 */
router.get('/exam/result/:id', authenticate, (request, response) => {

    //fetching the examID from the request parameter
    var id = request.params.id;

    /* Checking if the id is valid or not */
    if (!ObjectId.isValid(id))
        //if invalid, responsing with text and Bad Request status code
        return response.status(400).send('Invalid Exam ID');

    AggregateExamResult.getComparableData(id).then((aggregateExamResult) => {

        AggregateExamQuestionAnalysis.find({exam: id}).sort('question').select('question cutOff avreageTimeTakenByStudents studentsAttempted -_id avreageTimeTakenByStudentsWhoGotThisQuestionRight percentageOfStudentWhoAttemptedGotThisQuestionRight percentageOfStudentWhoAttempted').then((aggregateExamQuestionAnalysis) => {
            
            ExamReturn.findOne({exam: id}).populate('questionAnswers').exec((error, examReturn) => {

                if (error) return response.status(500).send(error);

                Exam.findById(id).populate('questions').exec((error, exam) => {

                    if (error) return response.status(500).send(error);
                    
                    var examAnalysis = _.pick(aggregateExamResult, ['averageTimeSpent', 'averageQuestionsAttempted', 'studentsAttempted', 'cutOff']);
    
                    var examResult = _.pick(examReturn, ['totalTimeTaken', 'totalQuestionAttempted', 'totalQuestionNotAttempted','percentageOfQuestionAttempted', 'percentageOfQuestionNotAttempted', 'marksObtained']);
    
                    var questionResult = examReturn.questionAnswers.map((doc) => _.pick(doc, ['question', 'timeTaken', 'answerSubmitted', 'isAnswerCorrect', 'marksObtained']));

                    var questions = exam.questions.map((question) => _.pick(question, ['body', 'answerOptionOne', 'answerOptionTwo', 'answerOptionThree', 'answerOptionFour', 'correctAnswer', 'marksForCorrectAnswer', 'negativeMark', 'difficulty', '_id']));

                    exam = _.pick(exam, ['name', 'description', 'allowedTime', 'subject']);

                    response.send({
                        examAnalysis,
                        aggregateExamQuestionAnalysis,
                        examResult,
                        questionResult,
                        exam,
                        questions
                    });

                });
                
            });

        }, (error) => response.status(500).send(error));

    }, (error) => response.status(400).send(error));


    //route finished here
});
/******************************************************************************************************** */

//Exporting the router to be used in the main application file
module.exports = router;