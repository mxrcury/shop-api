import { ApiError } from '../exceptions/error';
import { ShopsModel, Shop } from '../models/shop';
import { ItemsResponse } from '../types/controllers';
import {
  CreateShopDto,
  DistancesInput,
  ShopFiltersInput,
  Units,
  WithinInput,
} from '../types/shop';

class ShopService {
  async getShops({
    page = 0,
    limit = 0,
    filters,
  }: ShopFiltersInput): Promise<ItemsResponse<Shop>> {
    const items = (await ShopsModel.find(filters)
      .skip(page * limit)
      .limit(limit)
      .lean()
      .exec()) as Shop[];

    const totalCounts = await ShopsModel.countDocuments();

    return {
      items,
      totalCounts,
    };
  }

  async createShop({ name, location }: CreateShopDto): Promise<void> {
    await ShopsModel.create({ name, location });

    return;
  }

  async getShopsWithin({
    distance,
    lat,
    lng,
    unit = Units.Km,
  }: WithinInput): Promise<ItemsResponse<Shop>> {
    if (!distance || !lat || !lng || !unit) {
      throw ApiError.BadRequest('You did not enter all necessary options.');
    }

    const radius = {
      mi: distance / 3963.2,
      km: distance / 6378.1,
    };

    const items = await ShopsModel.find({
      location: { $geoWithin: { $centerSphere: [[lat, lng], radius[unit]] } },
    })
      .lean()
      .exec();

    return {
      items,
      totalCounts: items.length,
    };
  }

  async getShopsDistances({
    lat,
    lng,
    unit = Units.Km,
  }: DistancesInput): Promise<ItemsResponse<Shop>> {
    if (!lat || !lng || !unit) {
      throw ApiError.BadRequest('You did not enter all necessary options.');
    }

    const multiplyBy = {
      km: 0.001,
      mi: 0.000621371,
    };

    const items = await ShopsModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lng, lat] },
          distanceField: 'distance',
          distanceMultiplier: multiplyBy[unit],
        },
      },
      {
        $project: {
          distance: 1,
          name: 1,
          id: 1,
          location: {
            address: 1,
            description: 1,
          },
        },
      },
    ]).exec();

    return {
      items,
      totalCounts: items.length,
    };
  }
}

export default new ShopService();
