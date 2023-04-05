import { ReviewModel, Review } from '../models/review';
import { ItemsResponse } from '../types/controllers';
import { ReviewInput, ReviewsFilters } from '../types/review';

class ReviewService {
  async getReviews({
    page,
    limit = 0,
    shopItemId,
  }: ReviewsFilters): Promise<ItemsResponse<Review>> {
    const items = (await ReviewModel.find({ shopItemId })
      .skip(page * limit)
      .limit(limit)
      .lean()) as Review[];
    const totalCounts = await ReviewModel.countDocuments({ shopItemId });

    return { items, totalCounts };
  }

  async createReview(reviewInput: ReviewInput): Promise<void> {
    const { title, description, rating, authorId, shopItemId } = reviewInput;
    await ReviewModel.create({
      title,
      description,
      rating,
      authorId,
      shopItemId,
    });

    return;
  }
}

export default new ReviewService();
