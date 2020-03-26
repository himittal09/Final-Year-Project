import { Types, Schema, model } from 'mongoose';
import { reduce } from 'lodash';

import { IAggregateExamQADocument, IAggregateExamQAModel,IQADocument } from './interfaces';

import QuestionAnswer from './QuestionAnswer';
import ExamReturn from './ExamReturn';

import { pluckAndReduce } from '../middleware/methods';

const AggregateExamQuestionAnalysisSchema = new Schema <IAggregateExamQADocument> ({
    exam: { type: Types.ObjectId, ref: 'Exam' },
    question: { type: Types.ObjectId, ref: 'MCQuestion' },
    cutOff: {
        type: Number,
        default: 0
    },
    avreageTimeTakenByStudents: {
        type: Number,
        default: 0
    },
    studentsAttempted: {
        type: Number,
        default: 0
    },
    avreageTimeTakenByStudentsWhoGotThisQuestionRight: {
        type: Number,
        default: 0
    },
    percentageOfStudentWhoAttempted: {
        type: Number,
        default: 0
    },
    percentageOfStudentWhoAttemptedGotThisQuestionRight: {
        type: Number,
        default: 0
    }
});

AggregateExamQuestionAnalysisSchema.methods.calculateComparableQuestionDataByDocument = function () {

    return new Promise((resolve, reject) => {

        QuestionAnswer.find({exam: this.exam, question: this.question}).select('isAnswerCorrect marksObtained timeTaken -_id').then((questionAnswers: IQADocument[]) => {
            
            if (questionAnswers.length === 0)
            {
                reject('No Question Answers length, rejecting request');
                return;
            }

            this.cutOff = pluckAndReduce(questionAnswers, 'marksObtained');
            this.avreageTimeTakenByStudents = pluckAndReduce(questionAnswers, 'timeTaken');            
            this.studentsAttempted = questionAnswers.length;
    
            return ExamReturn.find({exam: this.exam}).count((error: Error, totalStudentWhoAttemptedExam: number): IAggregateExamQADocument | PromiseLike<IAggregateExamQADocument> => {
    
                if (error)
                {
                    reject(error);
                    return;
                }
                
                if (totalStudentWhoAttemptedExam <= 0)
                {
                    reject('No students who have attempted exam, rejecting request');
                    return;
                }

                this.percentageOfStudentWhoAttempted = questionAnswers.length * 100 / totalStudentWhoAttemptedExam;
                
                let correctAnswerTimes: number[] = [];
                questionAnswers.map((questionAnswer: IQADocument) => {
                    if (questionAnswer.isAnswerCorrect)
                    {
                        correctAnswerTimes.push(questionAnswer.timeTaken);
                    }
                });
    
                this.percentageOfStudentWhoAttemptedGotThisQuestionRight = correctAnswerTimes.length * 100 / questionAnswers.length;
    
                if (correctAnswerTimes.length) {
                    this.avreageTimeTakenByStudentsWhoGotThisQuestionRight = reduce( correctAnswerTimes, (total, n) => total+n ) / questionAnswers.length;
                }
                else
                {
                    this.avreageTimeTakenByStudentsWhoGotThisQuestionRight = 0;
                }

                this.save().then((doc: IAggregateExamQADocument | PromiseLike<IAggregateExamQADocument>) => resolve(doc), error => reject(error));
            });
        }, (error) => reject(error));
    

    });

    //finding Submitted answers of this exam and question
    
    //method finishes here
};

const AggregateExamQuestionAnalysis = model<IAggregateExamQADocument, IAggregateExamQAModel>('AggregateExamQuestionAnalysis', AggregateExamQuestionAnalysisSchema);

export default AggregateExamQuestionAnalysis;