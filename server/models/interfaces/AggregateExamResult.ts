import { Types, Document, Model } from 'mongoose';

export interface IAggregateExamResult
{
    exam: Types.ObjectId;
    questionAnalysis: Types.ObjectId[];
    cutOff: number;
    studentsAttempted: number;
    averageQuestionsAttempted: number;
    averageTimeSpent: number;
}

export interface IAERDocument extends Document, IAggregateExamResult
{
    calculateComparableDataByDocument: () => Promise<void>;
}

export interface IAERModel extends Model<IAERDocument>
{
    getComparableData: () => Promise<void>;
}
