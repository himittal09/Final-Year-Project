import { Schema, model } from 'mongoose';

import { ImcqQuestionDocument, ImcqQuestionModel } from './interfaces';

let answerType = {
    type: String,
    minlength: 1,
    maxlength: 10000,
    trim: true,
    required: true
}

const mcqQuestionSchema = new Schema <ImcqQuestionDocument> ({
    question: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100000,
        trim: true,
        unique: true
    },
    answer: answerType,
    options: [answerType],
    marks: {
        Type: Number
    },
    negativeMarks: {
        Type: Number
    },
    difficulty: {
        type: Number,
        min: 1,
        max: 10
    },
    attempts: {
        type: Number
    },
    correctAttempts: {
        type: Number
    },
    timesAppeared: {
        type: Number
    },
    averageTime: {
        type: Number
    },
    averageTimeforCorrect: {
        type: Number
    }
}, { timestamps: true });

mcqQuestionSchema.methods.toJSON = function (): Partial<ImcqQuestionDocument>
{
    return this.toObject();
    // let mcqQuestion = this.toObject();
    // return pick<ImcqQuestionDocument>(mcqQuestion);
};

const MCQuestion = model<ImcqQuestionDocument, ImcqQuestionModel>('MCQuestion', mcqQuestionSchema, 'MCQuestions');

export default MCQuestion;