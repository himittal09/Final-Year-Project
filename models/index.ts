import User from './User';
import MCQuestion from './mcqQuestion';
import QuestionAnswer from './QuestionAnswer';


export { User, MCQuestion, QuestionAnswer };



const AggregateExamQuestionAnalysis = require('./aggregateExamQuestionAnalysis');
const AggregateExamResult = require('./aggregateExamResult');
const Exam = require('./exam');
const ExamReturn = require('./examReturn');

module.exports = {
    AggregateExamQuestionAnalysis,
    AggregateExamResult,
    Exam,
    ExamReturn
};
