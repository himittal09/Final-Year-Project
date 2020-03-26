import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExam {
    name: string;
    description: string;
    allowedTime: number;
    subject: string;
    questions: Schema.Types.ObjectId[];
}

export interface IExamDocument extends Document, IExam
{
    // mention method function here as well
}

export interface IExamModel extends Model<IExamDocument>
{
    // mention static function here as well
    addQuestionRef: () => void;
}
