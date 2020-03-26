import mongoose, { Document, Model } from 'mongoose';

import UserRoles from '../userRoles';

export interface IUser
{
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber?: string;
    email: string;
    address?: string;
    password?: string;
    userLevel?: UserRoles;
}

export interface IUserDocument extends Document, IUser
{
    // mention method function here as well
    toJSON: () => Partial<IUserDocument>;
}

export interface IUserModel extends Model<IUserDocument>
{
    // mention static function here as well
    findByCredentials: () => Promise<IUserDocument>
}