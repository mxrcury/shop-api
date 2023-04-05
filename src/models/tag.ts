import { getModelForClass, prop } from '@typegoose/typegoose';
import { FIELD_CANNOT_BE_EMPTY } from '../constants';

export class Tag {
  @prop({
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('name tag')],
    unique: true,
  })
  name: string;
}

export const TagModel = getModelForClass(Tag);
