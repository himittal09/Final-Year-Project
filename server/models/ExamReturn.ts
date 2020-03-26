import { Schema, Types, model, NativeError } from 'mongoose';

import { IExamReturnDocument, IExamReturnModel, IExamDocument } from './interfaces';

import Exam from './Exam';

const ExamReturnSchema = new Schema <IExamReturnDocument> ({
    questionAnswers: [{ type: Types.ObjectId, ref: 'QuestionAnswer' }],
    exam: { type: Types.ObjectId, ref: 'Exam' },
    user: { type: Types.ObjectId, ref: 'Student' },
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
        default: 0
    }
});

ExamReturnSchema.statics.numberOfStudentsWhoAttemptedAQuestion = function (questionId: Types.ObjectId): number {
    return this.find({})
                .where('questionAnswers')
                .in([questionId])
                .count((error: Error, count: number) =>
    {
        if (error)
        {
            return -1;
        }
        return count;
    });
};


ExamReturnSchema.pre <IExamReturnDocument> ('save', function (next): void {
    Exam.findById(this.exam).select('questions -_id').exec((error: NativeError, exam: IExamDocument): Promise<IExamDocument> => {
        if (error)
        {
            return next(error);
        }
        this.totalQuestionNotAttempted = exam.questions.length - this.totalQuestionAttempted;
        this.percentageOfQuestionAttempted = this.totalQuestionAttempted * 100 / exam.questions.length;
        this.percentageOfQuestionNotAttempted = this.totalQuestionNotAttempted * 100 / exam.questions.length;
        next();
    });
});

const ExamReturn = model<IExamReturnDocument, IExamReturnModel>('ExamReturn', ExamReturnSchema, 'ExamReturns');

export default ExamReturn;