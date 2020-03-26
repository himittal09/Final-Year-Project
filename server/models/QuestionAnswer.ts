import { Schema, model, Types } from 'mongoose';

import { IQADocument, IQAModel, ImcqQuestionDocument } from './interfaces';

import MCQuestion from './mcqQuestion';

const QASchema = new Schema <IQADocument> ({
    question: { type: Types.ObjectId, ref: 'MCQuestion' },
    exam: { type: Types.ObjectId, ref: 'Exam' },
    timeTaken: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 3
    },
    answerSubmitted: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true,
        trim: true
    },
    isAnswerCorrect: {
        type: Boolean
    },
    marksObtained: {
        type: Number,
        maxlength: 2
    }
}, { timestamps: true });

QASchema.pre<IQADocument>('save', function (next) {
    MCQuestion.findById(this.question).then((question: ImcqQuestionDocument) => {
        if (question.answer === this.answerSubmitted)
        {
            this.isAnswerCorrect = true;
            this.marksObtained = question.marks;
        }
        else
        {
            this.isAnswerCorrect = false;
            this.marksObtained = -question.negativeMarks;
        }
        next();
    }, (error) => next(error));
});

const QuestionAnswer = model<IQADocument, IQAModel>('QuestionAnswer', QASchema, 'QuestionAnswers');

export default QuestionAnswer;