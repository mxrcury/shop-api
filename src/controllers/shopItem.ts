import express from 'express';

import ShopItemService from '../services/shopItem';
import getRegex from '../utils/getRegex';

import {
  ControllerRequest,
  ControllerResponse,
  ItemsResponse,
} from '../types/controllers';
import { ShopItem } from '../models/shopItem';

class ShopItemController {
  async getAll(
    req: ControllerRequest,
    res: express.Response<ItemsResponse<ShopItem>>
  ): ControllerResponse<ItemsResponse<ShopItem>> {
    const { page, limit, title, sortBy } = req.query;

    const filters = { searchFilter: { title: getRegex(title) }, sortBy };

    const shopItems = await ShopItemService.getShopItems({
      page: parseInt(page),
      limit: parseInt(limit),
      filters,
    });

    return res.status(200).send(shopItems);
  }

  async getOne(
    req: ControllerRequest,
    res: express.Response<ShopItem>
  ): ControllerResponse<ShopItem> {
    const { id } = req.params;

    const shopItem = await ShopItemService.getShopItem(id);

    return res.status(200).send(shopItem);
  }

  async create(
    req: ControllerRequest,
    res: express.Response
  ): ControllerResponse<void> {
    const shopItemInput = req.body;

    await ShopItemService.createShopItem({
      ...shopItemInput,
      userId: req.user.id,
    });

    return res.status(200).send();
  }

  async updateOne(
    req: ControllerRequest,
    res: express.Response
  ): ControllerResponse<void> {
    const { id } = req.params;
    const updatedData = req.body;
    const { id: currentUserId } = req.user;

    if (req.files.length) updatedData.photos = req.body.images;

    await ShopItemService.updateShopItem({ id, updatedData, currentUserId });

    return res.status(201).send();
  }

  async deleteOne(
    req: ControllerRequest,
    res: express.Response
  ): ControllerResponse<void> {
    const { id } = req.params;

    await ShopItemService.deleteShopItem(id);

    return res.status(204).send();
  }
}

export default new ShopItemController();
