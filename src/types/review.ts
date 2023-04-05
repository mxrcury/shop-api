import { Review } from '../models/review';
import { FiltersOptions } from './common';

export interface ReviewInput extends Review {}

export interface ReviewsFilters extends FiltersOptions {
  shopItemId: string;
}
