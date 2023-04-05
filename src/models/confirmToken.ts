import { getModelForClass, prop } from '@typegoose/typegoose';
import { User } from './user';
import { Ref } from '@typegoose/typegoose';
import { FIELD_CANNOT_BE_EMPTY } from '../constants';

class confirmToken {
  @prop({ type: String, required: [true, FIELD_CANNOT_BE_EMPTY('token')] })
  token: string;
  @prop({ required: [true, FIELD_CANNOT_BE_EMPTY('user id')], ref: () => User })
  userId: Ref<User>;
  @prop({
    type: Date,
    required: [true, FIELD_CANNOT_BE_EMPTY('expiring date')],
  })
  expiringDate: number;
}

export const ConfirmTokenModel = getModelForClass(confirmToken);
