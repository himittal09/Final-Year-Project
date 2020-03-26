"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Exam_1 = require("./Exam");
var ExamReturnSchema = new mongoose_1.Schema({
    questionAnswers: [{ type: mongoose_1.Types.ObjectId, ref: 'QuestionAnswer' }],
    exam: { type: mongoose_1.Types.ObjectId, ref: 'Exam' },
    user: { type: mongoose_1.Types.ObjectId, ref: 'Student' },
    totalTimeTaken: {
        type: Number
    },
    totalQuestionAttempted: {
        type: Number
    },
    totalQuestionNotAttempted: {
        type: Number
    },
    percentageOfQuestionAttempted: {
        type: Number
    },
    percentageOfQuestionNotAttempted: {
        type: Number
    },
    marksObtained: {
        type: Number,
        "default": 0
    }
});
ExamReturnSchema.statics.numberOfStudentsWhoAttemptedAQuestion = function (questionId) {
    return this.find({})
        .where('questionAnswers')["in"]([questionId])
        .count(function (error, count) {
        if (error) {
            return -1;
        }
        return count;
    });
};
ExamReturnSchema.pre('save', function (next) {
    var _this = this;
    Exam_1["default"].findById(this.exam).select('questions -_id').exec(function (error, exam) {
        if (error) {
            return next(error);
        }
        _this.totalQuestionNotAttempted = exam.questions.length - _this.totalQuestionAttempted;
        _this.percentageOfQuestionAttempted = _this.totalQuestionAttempted * 100 / exam.questions.length;
        _this.percentageOfQuestionNotAttempted = _this.totalQuestionNotAttempted * 100 / exam.questions.length;
        next();
    });
});
var ExamReturn = mongoose_1.model('ExamReturn', ExamReturnSchema, 'ExamReturns');
exports["default"] = ExamReturn;
