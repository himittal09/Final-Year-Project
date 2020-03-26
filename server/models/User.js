"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var validator_1 = require("validator");
var bcrypt = require("bcryptjs");
var lodash_1 = require("lodash");
var UserSchema = new mongoose_1.Schema({
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
            validator: function (value) { return validator_1["default"].isMobilePhone(value, 'en-IN'); },
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
            validator: function (value) { return validator_1["default"].isEmail(value); },
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
        "enum": ['basic', 'premium', 'editor', 'admin'],
        "default": 'basic'
    }
}, { timestamps: true });
UserSchema.methods.toJSON = function () {
    var user = this.toObject();
    return lodash_1.pick(user, 'firstName', 'lastName', 'middleName', 'phoneNumber', 'email', 'address', '_id', 'userLevel');
};
UserSchema.statics.findByCredentials = function (body) {
    return this.findOne({ 'email': body.email }).then(function (user) {
        if (!user) {
            return Promise.reject();
        }
        return new Promise(function (resolve, reject) {
            bcrypt.compare(body.password, user.password, function (error, isMatch) {
                if (isMatch) {
                    resolve(user);
                }
                else {
                    reject(error);
                }
            });
        });
    })["catch"](function (error) { return Promise.reject(error); });
};
UserSchema.pre('save', function (next) {
    var _this = this;
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password, 10, function (error, hash) {
        if (error) {
            next(error);
        }
        _this.password = hash;
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
var User = mongoose_1.model('User', UserSchema, 'Users');
exports["default"] = User;
