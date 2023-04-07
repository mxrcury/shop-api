import { getModelForClass, prop } from '@typegoose/typegoose';
import { FIELD_CANNOT_BE_EMPTY } from '../constants';

export class Category {
  @prop({ type: String, required: [true, FIELD_CANNOT_BE_EMPTY('name')] })
  name: string;
  @prop({ type: Number, required: false, default: 0 })
  totalShopItems: number;
}

export const CategoryModel = getModelForClass(Category);
