import { Types } from 'mongoose';

export interface IQuestion
{
    question: string;
    answer: string;
    
    // trick of answer
    shortcut?: string;
    
    marks: number;
    negativeMarks: number;
    difficulty?: number;

    attempts?: number;
    correctAttempts?: number;
    incorrectAttempts?: number;

    timesAppeared?: number;
    
    averageTime?: number;
    averageTimeforCorrect?: number;
    
    flags?: Flag[];
    comments?: Comment[];

    weightage?: number;
}

export interface Comment {
    comment: string;
    replies: Comment[];
    commentor: Types.ObjectId;
    commentDate: Date;
    votes: number;
}

export interface Flag {
    reason: string;
    flagger: Types.ObjectId;
    detail?: string;
}

export const weightFactorList = {
    NIMCET: 1,
    JEE: 0.9,
    BHU: 0.4,
    VIT: 0.4,
    BIT: 0.5,
    JNU: 0.7,
    IIT: 0.3
};

export const FLAG_REASON: string[] = [
    'correct answer not available in options',
    'incomplete question',
];