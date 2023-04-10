import { getModelForClass, prop } from '@typegoose/typegoose';

import { Roles, RolesType } from '../types/users';
import validator from 'validator';
import { FIELD_CANNOT_BE_EMPTY } from '../constants';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class User extends TimeStamps {
  @prop({ type: String, required: [true, FIELD_CANNOT_BE_EMPTY('first name')] })
  firstName: string;
  @prop({ type: String, required: [true, FIELD_CANNOT_BE_EMPTY('last name')] })
  lastName: string;
  @prop({
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('email')],
    minlength: [6, 'Your email has to be more than 8 length'],
    validate: validator.isEmail,
    unique: true,
  })
  email: string;
  @prop({
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('password')],
    minlength: [6, 'Your password has to be more than 6 length'],
  })
  password: string;
  @prop({
    type: String,
    default: Roles.Guest,
    enum: [Roles.Admin, Roles.Guest, Roles.Seller],
    select: false,
  })
  role: RolesType;
  @prop({ type: String, default: 'default.png' })
  photo?: string;
  @prop({ type: Boolean, default: false })
  confirmedEmail?: boolean;
}

export const UserModel = getModelForClass(User);
