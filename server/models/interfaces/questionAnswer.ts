import { Schema, Document, Model, Types } from 'mongoose';

export interface IQuestionAnswer {
    question: Types.ObjectId;
    exam: Types.ObjectId;
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