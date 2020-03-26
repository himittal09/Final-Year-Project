"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var methods_1 = require("../middleware/methods");
var ExamReturn_1 = require("./ExamReturn");
var AggregateExamResultSchema = new mongoose_1.Schema({
    exam: { type: mongoose_1.Types.ObjectId, ref: 'Exam' },
    questionAnalysis: [{ type: mongoose_1.Types.ObjectId, ref: 'AggregateExamQuestionAnalysis' }],
    cutOff: {
        type: Number,
        "default": 0
    },
    studentsAttempted: {
        type: Number,
        "default": 0
    },
    averageQuestionsAttempted: {
        type: Number,
        "default": 0
    },
    averageTimeSpent: {
        type: Number,
        "default": 0
    }
});
AggregateExamResultSchema.statics.getComparableData = function (examId) {
    return this.findOne({ exam: examId }).exec(function (error, aggregateExamResult) {
        if (error) {
            return Promise.reject(error);
        }
        if (!aggregateExamResult) {
            return Promise.reject('No Document Seeding Has been done');
        }
        return aggregateExamResult.calculateComparableDataByDocument();
    });
};
AggregateExamResultSchema.methods.calculateComparableDataByDocument = function () {
    var _this = this;
    return ExamReturn_1["default"].find({ exam: this.exam })
        .select('totalTimeTaken totalQuestionAttempted marksObtained -_id')
        .then(function (examReturns) {
        _this.cutOff = methods_1.pluckAndReduce(examReturns, 'marksObtained');
        _this.averageQuestionsAttempted = methods_1.pluckAndReduce(examReturns, 'totalQuestionAttempted');
        _this.averageTimeSpent = methods_1.pluckAndReduce(examReturns, 'totalTimeTaken');
        _this.studentsAttempted = examReturns.length;
        return _this.save();
    }, function (error) { return Promise.reject(error); });
};
var AggregateExamResult = mongoose_1.model('AggregateExamResult', AggregateExamResultSchema);
exports["default"] = AggregateExamResult;
