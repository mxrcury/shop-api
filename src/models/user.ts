import { getModelForClass, prop } from '@typegoose/typegoose'
import { Roles, RolesType } from '../types/users'
import validator from 'validator'

export class User {
    @prop({ type: String, required: [true, 'You did not entered your first name'] })
    firstName: string
    @prop({ type: String, required: [true, 'You did not entered your last name'] })
    lastName: string
    @prop({ type: String, required: [true, 'You did not entered your email.'], minlength: [6, 'Your email has to be more than 8 length'], maxlength: [30, 'Your email has to be less than 6 length'], unique: true })
    email: string
    @prop({ type: String, required: [true, 'Please enter your password'], minlength: [6, 'Your password has to be more than 6 length'], validate: validator.isEmail, unique: true })
    password: string
    @prop({ type: String, required: true, default: Roles.Guest, enum: [Roles.Admin, Roles.Guest] })
    role: RolesType
    @prop({ type: String, required: false, default: 'default.png' })
    photo?: string
    @prop({ type: Boolean, required: false, default: false })
    confirmedEmail?: boolean
}


export const UserModel = getModelForClass(User)
