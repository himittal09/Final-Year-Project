export interface IQuestion
{
    question: string;
    answer: string;
    marks: number;
    negativeMarks: number;
    difficulty: number;
    attempts: number;
    correctAttempts: number;
    timesAppeared: number;
    averageTime: number;
    averageTimeforCorrect: number;
}
