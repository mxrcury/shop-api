import {
  pre,
  prop,
  Ref,
  post,
  getModelForClass,
  modelOptions,
  Severity,
} from '@typegoose/typegoose';
import { User, UserModel } from './user';
import { Tag, TagModel } from './tag';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { FIELD_CANNOT_BE_EMPTY } from '../constants';
import { Shop } from './shop';
import { Category } from './category';

@pre<ShopItem>('save', async function (next) {
  const { firstName, lastName } = await UserModel.findById(this.authorId)
    .select('firstName lastName')
    .exec();
  if (!firstName || !lastName) return;
  this.createdBy = `${firstName} ${lastName}`;
  this.tags = await TagModel.find({ name: { $in: this.tags } });
  next();
})
@post<ShopItem>('save', async function (doc) {})
export class ShopItem extends TimeStamps {
  @prop({ type: String, required: [true, FIELD_CANNOT_BE_EMPTY('title')] })
  title: string;

  @prop({
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('description')],
    unique: true,
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

  // change it to someting like companyId, in order to shopItem was connect to some company BUT NOT shop, cause shop will be like real shop, and company will
  // be like web of such shops
  // something like there is branch Nike, and clothes are connected to this media of shops but not some specific shop
  // ALSO stay shopId field in order to mark what there is shopItem in what shop in real life
  @prop({
    required: [true, FIELD_CANNOT_BE_EMPTY('shop id ')],
    ref: () => Shop,
  })
  shopId?: Ref<Shop>;

  @prop({
    required: [true, FIELD_CANNOT_BE_EMPTY('category id')],
    ref: () => Category,
  })
  categoryId: string;

  @prop({ required: false, default: [], ref: () => Tag })
  tags?: Ref<Tag>[];

  @prop({ type: Number, required: [true, FIELD_CANNOT_BE_EMPTY('price')] })
  price: number;

  @prop({ type: Number, default: 0 })
  totalReviews: number;
}

export const ShopItemsModel = getModelForClass(ShopItem);
