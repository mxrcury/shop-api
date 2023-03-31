import express from 'express'

import { ControllerResponse, ItemsResponse, ControllerRequest } from "../types/controllers";
import { Review } from '../entities/review.entity';
import ReviewService from '../services/review';
import { UserModel } from '../models/user';


class ReviewController {
    async getAll(req: ControllerRequest, res: express.Response<ItemsResponse<Review>>): ControllerResponse<ItemsResponse<Review>> {
        const { page, limit } = req.query
        const { shopItemId } = req.params

        const { reviews, totalCounts } = await ReviewService.getReviews({ page:parseInt(page), limit:parseInt(limit), shopItemId })

        return res.status(200).send({
            items:reviews,
            totalCounts
        })
    }

    async create(req:ControllerRequest, res:express.Response<void>):ControllerResponse<void> {
        const { shopItemId } = req.params
        const reviewInput = req.body
        console.log(shopItemId, req.user, await UserModel.findById(req.user.id))
        await ReviewService.createReview({ ...reviewInput, authorId: req.user.id, shopItemId })

        return res.status(201).send()
    }
}

export default new ReviewController()