import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import pick from 'lodash/pick';

import { IUserModel, IUser, IUserDocument } from './interfaces/User';

import UserRoles from './userRoles';

const UserSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        maxlength: 15,
        required: true,
        trim: true
    },
    middleName: {
        type: String,
        maxlength: 15,
        trim: true
    },
    lastName: {
        type: String,
        maxlength: 15,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        maxlength: 14,
        validate: {
            validator: value => validator.isMobilePhone(value, 'en-IN'),
            message: '{VALUE} is not a Valid Phone Number.'
        }
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: '{VALUE} is not a Valid Email.'
        }
    },
    address: {
        type: String,
        maxlength: 500,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8 //unencrypted max pass length 64
    },
    userLevel: {
        type: String,
        enum: ['basic', 'premium', 'editor', 'admin'],
        default: 'basic'
    }
}, { timestamps: true });


UserSchema.methods.toJSON = function (): Partial<IUserDocument>
{
    let user = this.toObject();
    return pick<IUserDocument>(user, 'firstName', 'lastName', 'middleName', 'phoneNumber', 'email', 'address', '_id', 'userLevel');
};

UserSchema.statics.findByCredentials = function (body: any): Promise<IUserDocument>
{
    return this.findOne({'email': body.email}).then((user: IUserDocument) => {    
        if (!user)
        {
            return Promise.reject();
        }
        return new Promise<IUserDocument>((resolve, reject?: any) => {
            bcrypt.compare(body.password, user.password, (error: Error, response: boolean) => {
                if (response)
                {
                    resolve(user);
                }
                else
                {
                    reject(error);
                }
            });
        });
    }).catch((error: Error) => Promise.reject(error));
}

UserSchema.pre<IUserDocument>('save', function (next) {
    if (!this.isModified('password'))
    {
        return next();
    }
    bcrypt.hash(this.password, 10, (error: Error, hash: string) => {
        if (error)
        {
            next(error);
        }
        this.password = hash;
        next();
    });
});

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema, 'Users');

export default User;