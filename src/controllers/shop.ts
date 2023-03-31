import { Shop } from "../entities/shop.entity";
import { ControllerRequest, ControllerResponse, ItemsResponse } from "../types/controllers"
import express from 'express';
import getRegex from "../utils/getRegex";
import ShopService from "../services/shop";
import { WithinParams } from "../types/shop";

class ShopController {
    async getAll(req: ControllerRequest, res: express.Response<ItemsResponse<Shop>>): ControllerResponse<ItemsResponse<Shop>> {
        const { page, limit, name } = req.query

        const filters = { name: getRegex(name) }

        const { shops, totalCounts } = await ShopService.getShops({ page, limit, filters })

        return res.status(200).send({
            items: shops,
            totalCounts
        })
    }

    async create(req: express.Request, res: express.Response<void>): ControllerResponse<void> {
        const createData = req.body

        await ShopService.createShop(createData)

        return res.status(201).send()
    }

    async getWithin(req: express.Request<WithinParams>, res: express.Response<ItemsResponse<Shop>>): ControllerResponse<ItemsResponse<Shop>> {
        const { distance, latlng, unit } = req.params
        
        const [lat, lng] = latlng.split(',')

        const { shops, totalCounts } = await ShopService.getShopsWithin({
            distance: parseInt(distance),
            lat: parseInt(lat),
            lng: parseInt(lng),
            unit
        })

        return res.status(200).send({
            items: shops,
            totalCounts
        })

    }
}

export default new ShopController()