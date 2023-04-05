import {
  pre,
  prop,
  Ref,
  getModelForClass,
  modelOptions,
  Severity,
} from '@typegoose/typegoose';
import { User, UserModel } from './user';
import { Tag, TagModel } from './tag';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { FIELD_CANNOT_BE_EMPTY } from '../constants';
import { Shop } from './shop';

@pre<ShopItem>('save', async function (next) {
  const { firstName, lastName } = await UserModel.findById(this.authorId)
    .select('firstName lastName')
    .exec();
  if (!firstName || !lastName) return;
  this.createdBy = `${firstName} ${lastName}`;
  this.tags = await TagModel.find({ name: { $in: this.tags } });
  next();
})
// @modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class ShopItem extends TimeStamps {
  @prop({ type: String, required: [true, FIELD_CANNOT_BE_EMPTY('title')] })
  title: string;
  @prop({
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('description')],
  })
  description: string;
  @prop({ type: [String], required: [true, FIELD_CANNOT_BE_EMPTY('photos')] })
  photos: string[];
  @prop({ type: Number, default: 0 })
  quantity: number;
  @prop({
    required: [true, FIELD_CANNOT_BE_EMPTY('author id')],
    ref: () => User,
  })
  authorId: Ref<User>;
  @prop({ type: String, required: false })
  createdBy?: string;
  @prop({ required: false, ref: () => Shop })
  shopId?: Ref<Shop>;
  @prop({ required: false, ref: () => Tag })
  tags?: Ref<Tag>[];
  @prop({ type: Number, required: [true, FIELD_CANNOT_BE_EMPTY('price')] })
  price: number;
  @prop({ type: Number, default: 0 })
  totalReviews: number;
}

export const ShopItemsModel = getModelForClass(ShopItem);
