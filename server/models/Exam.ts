import { Schema, model, Types } from 'mongoose';

import { IExamDocument, IExamModel } from './interfaces';

const ExamSchema = new Schema<IExamDocument> ({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        uppercase: true
    },
    description: {
        type: String,
        maxlength: 10000
    },
    allowedTime: {
        type: Number,
        required: true,
        min: 1,
        max: 10000
    },
    subject: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500
    },
    questions: [{ type: Schema.Types.ObjectId, ref: 'MCQuestion' }]
});


ExamSchema.methods.addQuestionRef = function (id: Types.ObjectId): Promise<void> {
    this.questions.push(id);    
    return this.save();
};

const Exam = model<IExamDocument, IExamModel>('Exam', ExamSchema, 'Exams');

export default Exam;