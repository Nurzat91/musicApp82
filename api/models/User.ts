import mongoose from 'mongoose';
import {randomUUID} from 'crypto';
import bcrypt from 'bcrypt';

import {UserFields, UserMethods, UserModel} from "../types";

const SALT_WORK_FACTOR = 15;

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserFields, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },

});

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function (){
  this.token = randomUUID();
};

UserSchema.pre('save', async function(next) {

  if(!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) =>{
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model<UserFields, UserModel>('User', UserSchema);
export default User;