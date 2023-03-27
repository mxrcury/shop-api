import { getModelForClass, prop } from "@typegoose/typegoose";


export class Tag {
    @prop({ type: String, required: true, unique: true })
    name:string
}

export const TagModel = getModelForClass(Tag)