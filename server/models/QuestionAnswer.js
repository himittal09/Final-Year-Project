"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var mcqQuestion_1 = require("./mcqQuestion");
var QASchema = new mongoose_1.Schema({
    question: { type: mongoose_1.Types.ObjectId, ref: 'MCQuestion' },
    exam: { type: mongoose_1.Types.ObjectId, ref: 'Exam' },
    timeTaken: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 3
    },
    answerSubmitted: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true,
        trim: true
    },
    isAnswerCorrect: {
        type: Boolean
    },
    marksObtained: {
        type: Number,
        maxlength: 2
    }
}, { timestamps: true });
QASchema.pre('save', function (next) {
    var _this = this;
    mcqQuestion_1["default"].findById(this.question).then(function (question) {
        if (question.answer === _this.answerSubmitted) {
            _this.isAnswerCorrect = true;
            _this.marksObtained = question.marks;
        }
        else {
            _this.isAnswerCorrect = false;
            _this.marksObtained = -question.negativeMarks;
        }
        next();
    }, function (error) { return next(error); });
});
var QuestionAnswer = mongoose_1.model('QuestionAnswer', QASchema, 'QuestionAnswers');
exports["default"] = QuestionAnswer;
