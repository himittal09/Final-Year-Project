<<<<<<< Updated upstream:models/exam.js
//importing required packages installed by npm
const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    
=======
"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var ExamSchema = new mongoose_1.Schema({
>>>>>>> Stashed changes:server/models/Exam.js
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        uppercase: true
    },
    description: {
        type: String,
        maxlength: 10000
    },
    allowedTime: {
        type: Number,
        required: true,
        min: 1,
        max: 10000
    },
    subject: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500
    },
    questions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'MCQuestion' }]
});
<<<<<<< Updated upstream:models/exam.js

/**
 * @param {any} this
 * document method
 */
ExamSchema.pre('save', function (next) {

    //converting the exam name into upper case
    this.name = this.name.toUpperCase();
    next();

    //method ends here
});

/**
 * @param {any} this
 * @param {String} id
 * document method
 */
=======
>>>>>>> Stashed changes:server/models/Exam.js
ExamSchema.methods.addQuestionRef = function (id) {
    this.questions.push(id);
    return this.save();
};
var Exam = mongoose_1.model('Exam', ExamSchema, 'Exams');
exports["default"] = Exam;
