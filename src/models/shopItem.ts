import { pre, prop, Ref, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";
import { User, UserModel } from './user';
import { CreatedByInterface } from '../types/shopItem';
import { Tag, TagModel } from "./tag";
import { ReviewModel } from "./reviews";

@pre<ShopItem>('save', async function (next) {
    const user = await UserModel.findById(this.userId)
    if(!user) return
    const { firstName, lastName, email, photo } = user
    this.createdBy = { firstName, lastName, email, photo }
    this.tags = []
    this.createdAt = (new Date()).toJSON()
    this.tags = await Promise.all(this.tags.map(async (tag) => await TagModel.findOne({ name:tag })))
    next()
})

// read more about what is Mixed
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class ShopItem {
    @prop({ type: String, required: true })
    title: string
    @prop({ type: String, required: true })
    description: string
    @prop({ type: [String], required: false })
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
    tags: string[]
    @prop({ type: Number, required: true })
    price: number
    @prop({ type: Number, required: false, default: 0 })
    totalReviews: number
}

export const ShopItemsModel = getModelForClass(ShopItem)
