"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var lodash_1 = require("lodash");
var QuestionAnswer_1 = require("./QuestionAnswer");
var ExamReturn_1 = require("./ExamReturn");
var methods_1 = require("../middleware/methods");
var AggregateExamQuestionAnalysisSchema = new mongoose_1.Schema({
    exam: { type: mongoose_1.Types.ObjectId, ref: 'Exam' },
    question: { type: mongoose_1.Types.ObjectId, ref: 'MCQuestion' },
    cutOff: {
        type: Number,
        "default": 0
    },
    avreageTimeTakenByStudents: {
        type: Number,
        "default": 0
    },
    studentsAttempted: {
        type: Number,
        "default": 0
    },
    avreageTimeTakenByStudentsWhoGotThisQuestionRight: {
        type: Number,
        "default": 0
    },
    percentageOfStudentWhoAttempted: {
        type: Number,
        "default": 0
    },
    percentageOfStudentWhoAttemptedGotThisQuestionRight: {
        type: Number,
        "default": 0
    }
});
AggregateExamQuestionAnalysisSchema.methods.calculateComparableQuestionDataByDocument = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        QuestionAnswer_1["default"].find({ exam: _this.exam, question: _this.question }).select('isAnswerCorrect marksObtained timeTaken -_id').then(function (questionAnswers) {
            if (questionAnswers.length === 0) {
                reject('No Question Answers length, rejecting request');
                return;
            }
            _this.cutOff = methods_1.pluckAndReduce(questionAnswers, 'marksObtained');
            _this.avreageTimeTakenByStudents = methods_1.pluckAndReduce(questionAnswers, 'timeTaken');
            _this.studentsAttempted = questionAnswers.length;
            return ExamReturn_1["default"].find({ exam: _this.exam }).count(function (error, totalStudentWhoAttemptedExam) {
                if (error) {
                    reject(error);
                    return;
                }
                if (totalStudentWhoAttemptedExam <= 0) {
                    reject('No students who have attempted exam, rejecting request');
                    return;
                }
                _this.percentageOfStudentWhoAttempted = questionAnswers.length * 100 / totalStudentWhoAttemptedExam;
                var correctAnswerTimes = [];
                questionAnswers.map(function (questionAnswer) {
                    if (questionAnswer.isAnswerCorrect) {
                        correctAnswerTimes.push(questionAnswer.timeTaken);
                    }
                });
                _this.percentageOfStudentWhoAttemptedGotThisQuestionRight = correctAnswerTimes.length * 100 / questionAnswers.length;
                if (correctAnswerTimes.length) {
                    _this.avreageTimeTakenByStudentsWhoGotThisQuestionRight = lodash_1.reduce(correctAnswerTimes, function (total, n) { return total + n; }) / questionAnswers.length;
                }
                else {
                    _this.avreageTimeTakenByStudentsWhoGotThisQuestionRight = 0;
                }
                _this.save().then(function (doc) { return resolve(doc); }, function (error) { return reject(error); });
            });
        }, function (error) { return reject(error); });
    });
    //finding Submitted answers of this exam and question
    //method finishes here
};
var AggregateExamQuestionAnalysis = mongoose_1.model('AggregateExamQuestionAnalysis', AggregateExamQuestionAnalysisSchema);
exports["default"] = AggregateExamQuestionAnalysis;
