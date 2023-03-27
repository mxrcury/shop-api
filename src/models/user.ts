import { getModelForClass, pre, prop } from '@typegoose/typegoose'
import { Roles, RolesType } from '../types/users'


export class User {
    @prop({ type: String, required: true })
    firstName: string
    @prop({ type: String, required: true })
    lastName: string
    @prop({ type: String, required: true, minlength: 8, maxlength: 30, unique: true })
    email: string
    @prop({ type: String, required: true, minlength: [6, 'Your password has to be more than 6 length'] })
    password: string
    @prop({ type: String, required: true, default: Roles.Guest, enum: [Roles.Admin, Roles.Guest] })
    role: RolesType
    @prop({ type: String, required: false })
    photo?: string
    @prop({ type: Boolean, required: false, default: false })
    confirmedEmail: boolean
}


export const UserModel = getModelForClass(User)
