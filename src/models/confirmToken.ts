import { getModelForClass, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './user';
import { Ref } from '@typegoose/typegoose';


class confirmToken {
    @prop({ type: String, required: true })
    token:string
    @prop({ type: Schema.Types.ObjectId, required: true, ref: () => User})
    userId:Ref<User, string>
    @prop({ type: Date, required: true })
    expiringDate:number
}

export const ConfirmTokenModel = getModelForClass(confirmToken)