import { Types, Model, Document } from 'mongoose';

export interface IAggregateExamQA
{
    exam: Types.ObjectId;
    question: Types.ObjectId;
    cutOff: number;
    avreageTimeTakenByStudents: number;
    studentsAttempted: number;
    avreageTimeTakenByStudentsWhoGotThisQuestionRight: number;
    percentageOfStudentWhoAttempted: number;
    percentageOfStudentWhoAttemptedGotThisQuestionRight: number;
}

export interface IAggregateExamQADocument extends Document, IAggregateExamQA
{
    calculateComparableQuestionDataByDocument: () => Promise<IAggregateExamQADocument>;
}

export interface IAggregateExamQAModel extends Model<IAggregateExamQADocument>
{

}