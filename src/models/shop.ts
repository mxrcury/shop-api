import { Typegoose } from "@hasezoey/typegoose";
import { prop, getModelForClass, index } from "@typegoose/typegoose";

class Location {
    @prop({ type:String ,default: 'Point', enum: [ 'Point' ]})
    type:string
    @prop({ type:[Number], required: true})
    coordinates:[number, number]
    @prop({ type: String, required: true })
    address:string
    @prop({ type:String })
    description:string
}


@index({ location: '2dsphere' })
export class Shop {
    @prop({ type:String, required: true })
    name:string
    @prop()
    location:Location
}

export const ShopsModel = getModelForClass(Shop)
