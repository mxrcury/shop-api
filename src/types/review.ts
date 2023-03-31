import { Review } from "../entities/review.entity";

export interface ReviewInput extends Review {}

export interface ReviewsResponse {
    reviews:Review[],
    totalCounts:number
}