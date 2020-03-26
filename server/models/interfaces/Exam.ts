import { Schema, Document, Model, Types } from 'mongoose';

export interface IExam {
    name: string;
    description: string;
    allowedTime: number;
    subject: string;
    questions: Types.ObjectId[];
}

export interface IExamDocument extends Document, IExam
{
    // mention method function here as well
    addQuestionRef: (id: Types.ObjectId) => Promise<void>;
}

export interface IExamModel extends Model<IExamDocument>
{
    // mention static function here as well
}
