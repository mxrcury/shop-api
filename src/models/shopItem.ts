import { pre, prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { User, UserModel } from './user';
import { CreatedByInterface } from '../types/shopItem';
import { Tag } from "./tag";

@pre<ShopItem>('save', async function (next) {
    const user = await UserModel.findById(this.userId)
    if (user) {
        const { firstName, lastName, email, photo } = user
        this.createdBy = { firstName, lastName, email, photo }
        next()
    }
})

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
    createdBy:CreatedByInterface
    @prop({ type: String, required: true, ref: () => User })
    userId: Ref<User, string>
    @prop({ type: Number, required: true })
    createdAt: number
    // @prop({ type: String, required: false, ref: 'Seller' })
    // seller: string
    @prop({ type: () => String, required: false, ref: () => Tag })
    tags:Ref<Tag, string>[]
    @prop({ type: Number, required: true})
    price:number
    @prop({ type: Number, required: true, default: 0 })
    totalReviews: number
}

export const ShopItemsModel = getModelForClass(ShopItem)

// ShopItemsModel.schema.calculateAverageRating = function(shopItemId) {

// }

