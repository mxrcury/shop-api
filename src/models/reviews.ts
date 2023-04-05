import { getModelForClass, index, post, prop, Ref } from '@typegoose/typegoose';
import { User } from './user';
import { ShopItem, ShopItemsModel } from './shopItem';
import { FIELD_CANNOT_BE_EMPTY } from '../constants';

@post<Reviews>('save', async function (doc) {
  const reviewsQty = await ReviewModel.countDocuments({ id: doc.shopItemId });
  await ShopItemsModel.findByIdAndUpdate(doc.shopItemId, {
    totalReviews: reviewsQty,
  });
})
@post<Reviews>(/^findOneAndRemove/, async function (doc) {
  const reviewsQty = await ReviewModel.countDocuments({ id: doc.shopItemId });
  await ShopItemsModel.findByIdAndUpdate(doc.shopItemId, {
    totalReviews: reviewsQty,
  });
})
@index({ authorId: 1, shopItemId: 1 }, { unique: true })
class Reviews {
  @prop({ type: String, required: [true, FIELD_CANNOT_BE_EMPTY('title')] })
  title: string;
  @prop({ type: String, required: false })
  description?: string;
  @prop({ type: Number, required: [true, FIELD_CANNOT_BE_EMPTY('rating')] })
  rating: number;
  @prop({
    required: [true, FIELD_CANNOT_BE_EMPTY('author id')],
    ref: () => User,
  })
  authorId: Ref<User>;
  @prop({
    required: [true, FIELD_CANNOT_BE_EMPTY('shop item id')],
    ref: () => ShopItem,
  })
  shopItemId: Ref<ShopItem>;
}

export const ReviewModel = getModelForClass(Reviews);
