import { Types, Document, Model } from 'mongoose';

export interface IExamReturn
{
    questionAnswers: Types.ObjectId[];
    exam: Types.ObjectId;
    user: Types.ObjectId;
    totalTimeTaken: number;
    totalQuestionAttempted: number;
    totalQuestionNotAttempted: number;
    percentageOfQuestionAttempted: number;
    percentageOfQuestionNotAttempted: number
    marksObtained: number;
}

export interface IExamReturnDocument extends IExamReturn, Document
{

}

export interface IExamReturnModel extends Model<IExamReturnDocument>
{
    numberOfStudentsWhoAttemptedAQuestion: (questionId: Types.ObjectId) => number;
}
