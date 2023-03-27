import express from 'express';
import ShopItemService from '../services/shopItem'
import { ControllerRequest, ControllerResponse, ItemsResponse } from '../types/controllers';
import { User } from '../models/user';


class ShopItemController {
    async getAll (req: ControllerRequest, res: express.Response<ItemsResponse<User>>): ControllerResponse<ItemsResponse<User>> {
        const { page, limit } = req.query
        const { shopItems, totalCounts } = await ShopItemService.getShopItems(page, limit)

        return res.status(200).send({
            items:shopItems,
            totalCounts
        })
    }
    async create(
        req: express.Request<any, any>,
        res: express.Response
    ): ControllerResponse<void> {
        const shopItem = req.body

        await ShopItemService.createShopItem(shopItem)

        return res.status(200).send()
    }
}

export default new ShopItemController()