import express from 'express';

import ShopItemService from '../services/shopItem'
import getRegex from '../utils/getRegex';

import { User } from '../models/user';

import { ControllerRequest, ControllerResponse, ItemsResponse } from '../types/controllers';
import { ShopItem } from '../entities/shopItem.entity';


class ShopItemController {
    async getAll(req: ControllerRequest, res: express.Response<ItemsResponse<User>>): ControllerResponse<ItemsResponse<User>> {
        const { page, limit, title, sortBy } = req.query

        const filters = { searchFilter:{ title: getRegex(title) }, sortBy }

        const { shopItems, totalCounts } = await ShopItemService.getShopItems({ page:parseInt(page), limit:parseInt(limit), filters })

        return res.status(200).send({
            items: shopItems,
            totalCounts
        })
    }

    async getOne(req: ControllerRequest, res: express.Response<ShopItem>): ControllerResponse<ShopItem> {
        const { id } = req.params

        const shopItem = await ShopItemService.getShopItemById(id)

        return res.status(200).send(shopItem)
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