import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from './user';

class Reviews {
    @prop({ type: String, required: true })
    title: string
    @prop({ type: String, required: false })
    description?: string
    @prop({ type: Number, required: true })
    rating: number
    @prop({ type: ObjectId, required: true, ref: () => User })
    authorId: string
}

export const ReviewModel = getModelForClass(Reviews)