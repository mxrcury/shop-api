import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { FIELD_CANNOT_BE_EMPTY } from '../constants';
import { CategoryStatus } from '../types/category';
import { User } from './user';

@index({ name: 1 }, { unique: true })
export class Category {
  @prop({
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('name')],
    unique: true,
  })
  name: string;
  @prop({ type: Number, required: false, default: 0 })
  totalShopItems: number;
  @prop({
    type: String,
    required: false,
    default: CategoryStatus.Activated,
    enum: [CategoryStatus.Activated, CategoryStatus.Requested],
  })
  status: CategoryStatus.Requested | CategoryStatus.Activated;
  @prop({ type: String, required: false, ref: () => User })
  currentUserId?: string;
}

export const CategoryModel = getModelForClass(Category);
