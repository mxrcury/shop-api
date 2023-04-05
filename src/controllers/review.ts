import express from 'express';

import {
  ControllerResponse,
  ItemsResponse,
  ControllerRequest,
} from '../types/controllers';
import { Review } from '../entities/review.entity';
import ReviewService from '../services/review';

class ReviewController {
  async getAll(
    req: ControllerRequest,
    res: express.Response<ItemsResponse<Review>>
  ): ControllerResponse<ItemsResponse<Review>> {
    const { page, limit } = req.query;
    const { shopItemId } = req.params;

    const reviews = await ReviewService.getReviews({
      page: parseInt(page),
      limit: parseInt(limit),
      shopItemId,
    });

    return res.status(200).send(reviews);
  }

  async create(
    req: ControllerRequest,
    res: express.Response<void>
  ): ControllerResponse<void> {
    const { shopItemId } = req.params;
    const reviewInput = req.body;

    await ReviewService.createReview({
      ...reviewInput,
      authorId: req.user.id,
      shopItemId,
    });

    return res.status(201).send();
  }
}

export default new ReviewController();
