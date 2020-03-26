import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuestionAnswer {
    question: Schema.Types.ObjectId;
    exam: Schema.Types.ObjectId;
    timeTaken: number;
    answerSubmitted: string;
    isAnswerCorrect: boolean;
    marksObtained: number;
}

export interface IQADocument extends Document, IQuestionAnswer
{
    // mention method function here as well
    toJSON: () => Partial<IQADocument>;
}

export interface IQAModel extends Model<IQADocument>
{
    // mention static function here as well
}