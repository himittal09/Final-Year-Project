import mongoose, { Schema } from 'mongoose';

import { IQADocument, IQAModel, IQuestionAnswer } from './interfaces/questionAnswer';
import MCQuestion from './mcqQuestion';
import { ImcqQuestionDocument } from './interfaces/mcqQuestion';

const QASchema = new Schema <IQuestionAnswer> ({
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'MCQuestion' },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
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

const QuestionAnswer = mongoose.model<IQADocument, IQAModel>('QuestionAnswer', QASchema, 'QuestionAnswers');

export default QuestionAnswer;