import { Document, Model } from 'mongoose';

import { IQuestion } from './Question';

export interface ImcqQuestion extends IQuestion
{
    options: string[];
}

export interface ImcqQuestionDocument extends Document, ImcqQuestion
{
    // mention method function here as well
    toJSON: () => Partial<ImcqQuestionDocument>
}

export interface ImcqQuestionModel extends Model<ImcqQuestionDocument>
{
    // mention static function here as well
}
