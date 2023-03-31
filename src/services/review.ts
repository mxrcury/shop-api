import { ReviewModel } from "../models/reviews";
import { ReviewInput, ReviewsFilters, ReviewsResponse } from "../types/review";


class ReviewService {
    async getReviews({ page, limit = 0, shopItemId }:ReviewsFilters):Promise<ReviewsResponse> {
        const reviews = await ReviewModel.find({ shopItemId }).skip(page * limit).limit(limit).lean()

        const totalCounts = await ReviewModel.countDocuments({ shopItemId })

        return { reviews, totalCounts }
    }
    
    async createReview({ title, description, rating, authorId, shopItemId }:ReviewInput):Promise<void> {
        await ReviewModel.create({ title, description, rating, authorId, shopItemId })
        
        return
    }

}

export default new ReviewService()