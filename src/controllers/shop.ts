import { Shop } from '../models/shop';
import {
  ControllerRequest,
  ControllerResponse,
  ItemsResponse,
} from '../types/controllers';
import express from 'express';
import getRegex from '../utils/getRegex';
import ShopService from '../services/shop';
import { DistancesParams, WithinParams } from '../types/shop';

class ShopController {
  async getAll(
    req: ControllerRequest,
    res: express.Response<ItemsResponse<Shop>>
  ): ControllerResponse<ItemsResponse<Shop>> {
    const { page, limit, name } = req.query;

    const filters = { name: getRegex(name) };

    const shops = await ShopService.getShops({ page, limit, filters });

    return res.status(200).send(shops);
  }

  async create(
    req: express.Request,
    res: express.Response<void>
  ): ControllerResponse<void> {
    const createData = req.body;

    await ShopService.createShop(createData);

    return res.status(201).send();
  }

  async getWithin(
    req: express.Request<WithinParams>,
    res: express.Response<ItemsResponse<Shop>>
  ): ControllerResponse<ItemsResponse<Shop>> {
    const { distance, latlng, unit } = req.params;

    const [lat, lng] = latlng.split(',');

    const shops = await ShopService.getShopsWithin({
      distance: parseInt(distance),
      lat: parseInt(lat),
      lng: parseInt(lng),
      unit,
    });

    return res.status(200).send(shops);
  }

  async getDistances(
    req: express.Request<DistancesParams>,
    res: express.Response<ItemsResponse<Shop>>
  ): ControllerResponse<ItemsResponse<Shop>> {
    const { latlng, unit } = req.params;

    const [lat, lng] = latlng.split(',');

    const shops = await ShopService.getShopsDistances({
      lat: parseInt(lat),
      lng: parseInt(lng),
      unit,
    });

    return res.status(200).send(shops);
  }
}

export default new ShopController();
