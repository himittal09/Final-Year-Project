import { Schema, model } from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';
import { pick } from 'lodash';

import { IUserModel, IUserDocument, loginCred } from './interfaces';

const UserSchema = new Schema <IUserDocument> ({
    firstName: {
        type: String,
        maxlength: 100,
        required: true,
        trim: true
    },
    middleName: {
        type: String,
        maxlength: 100,
        trim: true
    },
    lastName: {
        type: String,
        maxlength: 100,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
        validate: {
            validator: value => validator.isMobilePhone(value, 'en-IN'),
            message: '{VALUE} is not a Valid Phone Number.'
        }
    },
    email: {
        type: String,
        required: true,
        maxlength: 500,
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

UserSchema.statics.findByCredentials = function (body: loginCred): Promise<IUserDocument>
{
    return this.findOne({'email': body.email}).then((user: IUserDocument) => {    
        if (!user)
        {
            return Promise.reject();
        }
        return new Promise<IUserDocument>((resolve, reject?: any) => {
            bcrypt.compare(body.password, user.password, (error: Error, isMatch: boolean) => {
                if (isMatch)
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

/**
 * userSchema.methods.gravatar = function (size: number) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};
 */

const User = model<IUserDocument, IUserModel>('User', UserSchema, 'Users');

export default User;