import { prop, getModelForClass, index } from '@typegoose/typegoose';
import { FIELD_CANNOT_BE_EMPTY } from '../constants';

export class Location {
  @prop({ type: String, default: 'Point', enum: ['Point'] })
  type: string;
  @prop({
    type: [Number],
    required: [true, FIELD_CANNOT_BE_EMPTY('coordinates')],
  })
  coordinates: [number, number];
  @prop({ type: String, required: [true, FIELD_CANNOT_BE_EMPTY('address')] })
  address: string;
  @prop({
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('description')],
  })
  description: string;
}

@index({ location: '2dsphere' })
export class Shop {
  @prop({ type: String, required: [true, FIELD_CANNOT_BE_EMPTY('name')] })
  name: string;
  @prop({ type: Number, required: false, default: 0 })
  averageRating?: number;
  @prop()
  location: Location;
}

export const ShopsModel = getModelForClass(Shop);
