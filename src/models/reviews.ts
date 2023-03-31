import { getModelForClass, index, post, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from './user';
import { ShopItem, ShopItemsModel } from "./shopItem";
import { Review } from "../entities/review.entity";

@post<Reviews>('save', async function () {
    await ShopItemsModel.findByIdAndUpdate((await this).shopItemId, { $inc: { totalReviews: 1 } }).exec()
})

@post<Review>(/^findOneAndRemove/, async function () {
    await ShopItemsModel.findByIdAndUpdate((await this).shopItemId, { $inc: { totalReviews: -1 } }).exec()
})

@index({ authorId: 1, shopItemId:1 }, { unique: true })
class Reviews {
    @prop({ type: String, required: true })
    title: string
    @prop({ type: String, required: false })
    description?: string
    @prop({ type: Number, required: true })
    rating: number
    @prop({ type: ObjectId, required: true, ref: () => User })
    authorId: string
    @prop({ type: ObjectId, required: true, ref: () => ShopItem })
    shopItemId: string
}

export const ReviewModel = getModelForClass(Reviews)