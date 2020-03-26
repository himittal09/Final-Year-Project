import { Types, Schema, model } from 'mongoose';

import { IAERDocument, IAERModel, IExamReturnDocument } from './interfaces';

import { pluckAndReduce } from '../middleware/methods';

import ExamReturn from './ExamReturn';

const AggregateExamResultSchema = new Schema <IAERDocument> ({
    exam: { type: Types.ObjectId, ref: 'Exam' },
    questionAnalysis: [{ type: Types.ObjectId, ref: 'AggregateExamQuestionAnalysis' }],
    cutOff: {
        type: Number,
        default: 0
    },
    studentsAttempted: {
        type: Number,
        default: 0
    },
    averageQuestionsAttempted: {
        type: Number,
        default: 0
    },
    averageTimeSpent: {
        type: Number,
        default: 0
    }
});

AggregateExamResultSchema.statics.getComparableData = function (examId: Types.ObjectId): Promise<void> {
    return this.findOne({exam: examId}).exec((error: Error, aggregateExamResult: IAERDocument) => {        
        if (error)
        {
            return Promise.reject(error);
        }
        if (!aggregateExamResult)
        {
            return Promise.reject('No Document Seeding Has been done');
        }
        return aggregateExamResult.calculateComparableDataByDocument();
    });
};


AggregateExamResultSchema.methods.calculateComparableDataByDocument = function (): Promise<void> {
    return ExamReturn.find({exam: this.exam})
                    .select('totalTimeTaken totalQuestionAttempted marksObtained -_id')
                    .then((examReturns: IExamReturnDocument[]): Promise<void> =>
    {
        this.cutOff = pluckAndReduce(examReturns, 'marksObtained');
        this.averageQuestionsAttempted = pluckAndReduce(examReturns, 'totalQuestionAttempted');
        this.averageTimeSpent = pluckAndReduce(examReturns, 'totalTimeTaken');
        this.studentsAttempted = examReturns.length;
        return this.save();
    }, (error) => Promise.reject(error));
};

const AggregateExamResult = model<IAERDocument, IAERModel>('AggregateExamResult', AggregateExamResultSchema);

export default AggregateExamResult;

