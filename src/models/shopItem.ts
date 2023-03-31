import { pre, prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { User, UserModel } from './user';
import { CreatedByInterface } from '../types/shopItem';
import { Tag, TagModel } from "./tag";
import { ReviewModel } from "./reviews";

@pre<ShopItem>('save', async function (next) {
    const user = await UserModel.findById(this.userId)
    if(!user) return
    const { firstName, lastName, email, photo } = user
    this.createdBy = { firstName, lastName, email, photo }
    this.totalReviews = await ReviewModel.countDocuments({ shopItemId:this._id })
    console.log(this.tags)
    this.tags = []
    this.createdAt = (new Date()).toJSON()
    // this.tags = this.tags.map(async (tag) => await TagModel.findOne({ name:tag.name }))
    console.log(this.totalReviews)
    next()
})
// @post<ShopItem>(/find/)

class ShopItem {
    @prop({ type: String, required: true })
    title: string
    @prop({ type: String, required: true })
    description: string
    @prop({ type: Array, required: false })
    photos: string[]
    @prop({ type: Number, required: false, default: 0 })
    quantity: number
    @prop({
        type: Object, required: false
    })
    createdBy: CreatedByInterface
    @prop({ type: String, required: true, ref: () => User })
    userId: Ref<User, string>
    @prop({ type: Date, required: false })
    createdAt: string
    // @prop({ type: String, required: false, ref: 'Seller' })
    // seller: string
    @prop({ type: () => String, required: false, ref: () => Tag })
    tags: Ref<Tag, string>[]
    @prop({ type: Number, required: true })
    price: number
    @prop({ type: Number, required: false, default: 0 })
    totalReviews: number
}

export const ShopItemsModel = getModelForClass(ShopItem)

// ShopItemsModel.calculateAverageRating = function (shopItemId) {

// }

