import { getModelForClass, prop } from '@typegoose/typegoose';
import { FIELD_CANNOT_BE_EMPTY } from '../constants';
import { ItemStatus } from '../types/common';
import { User } from './user';

export class Tag {
  @prop({
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('name tag')],
    unique: true,
  })
  name: string;

  @prop({ type: Number, required: false, default: 0 })
  totalUsedQty: number;

  @prop({
    type: String,
    required: false,
    default: ItemStatus.Activated,
    enum: [ItemStatus.Activated, ItemStatus.Requested],
  })
  status: ItemStatus.Requested | ItemStatus.Activated;

  @prop({ type: String, required: false, ref: () => User })
  userId?: string;
}

export const TagModel = getModelForClass(Tag);
