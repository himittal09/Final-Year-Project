"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var answerType = {
    type: String,
    minlength: 1,
    maxlength: 10000,
    trim: true,
    required: true
};
var mcqQuestionSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100000,
        trim: true,
        unique: true
    },
    answer: answerType,
    options: [answerType],
    marks: {
        Type: Number
    },
    negativeMarks: {
        Type: Number
    },
    difficulty: {
        type: Number,
        min: 1,
        max: 10
    },
    attempts: {
        type: Number
    },
    correctAttempts: {
        type: Number
    },
    timesAppeared: {
        type: Number
    },
    averageTime: {
        type: Number
    },
    averageTimeforCorrect: {
        type: Number
    }
}, { timestamps: true });
mcqQuestionSchema.methods.toJSON = function () {
    return this.toObject();
    // let mcqQuestion = this.toObject();
    // return pick<ImcqQuestionDocument>(mcqQuestion);
};
var MCQuestion = mongoose_1.model('MCQuestion', mcqQuestionSchema, 'MCQuestions');
exports["default"] = MCQuestion;
