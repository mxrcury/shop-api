import { Review } from "../entities/review.entity";
import { ReviewModel } from "../models/reviews";
import { FiltersOptions } from "../types/common";
import { ReviewInput, ReviewsResponse } from "../types/review";


class ReviewService {
    async getReviews({ page, limit }:FiltersOptions):Promise<ReviewsResponse> {
        const reviews = await ReviewModel.find().skip(page * limit).limit(limit).lean()

        const totalCounts = await ReviewModel.countDocuments()

        return { reviews, totalCounts }
    }
    
    async createReview(review:ReviewInput):Promise<void> {
        await ReviewModel.create(review)
        
        return
    }

}

export default new ReviewService()