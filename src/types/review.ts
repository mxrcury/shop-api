import { Review } from "../entities/review.entity";
import { FiltersOptions } from "./common";

export interface ReviewInput extends Review {}

export interface ReviewsResponse {
    reviews:Review[],
    totalCounts:number
}

export interface ReviewsFilters extends FiltersOptions {
    shopItemId:string
}