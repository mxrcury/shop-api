import express from 'express'

import { ControllerResponse, ItemsResponse, ControllerRequest } from "../types/controllers";
import { Review } from '../entities/review.entity';
import ReviewService from '../services/review';


class ReviewController {
    async getAll(req: ControllerRequest, res: express.Response<ItemsResponse<Review>>): ControllerResponse<ItemsResponse<Review>> {
        const { page, limit } = req.query

        const { reviews, totalCounts } = await ReviewService.getReviews({ page:parseInt(page), limit:parseInt(limit) })

        return res.status(200).send({
            items:reviews,
            totalCounts
        })
    }
}