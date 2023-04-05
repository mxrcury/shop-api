import { ApiError } from '../exceptions/error';
import { ShopsModel } from '../models/shop';
import {
    DistancesInput,
    ShopFiltersInput,
    ShopsResponse,
    WithinInput,
} from '../types/shop';

class ShopService {
    async getShops({
        page = 0,
        limit = 0,
        filters,
    }: ShopFiltersInput): Promise<ShopsResponse> {
        const shops = await ShopsModel.find(filters)
            .skip(page * limit)
            .limit(limit)
            .lean()
            .exec();

        const totalCounts = await ShopsModel.countDocuments();

        return {
            shops,
            totalCounts,
        };
    }

    async createShop({
        name,
        location,
    }: {
        name: string;
        location: string;
    }): Promise<void> {
        await ShopsModel.create({ name, location });

        return;
    }

    async getShopsWithin({
        distance,
        lat,
        lng,
        unit,
    }: WithinInput): Promise<ShopsResponse> {
        if (!distance || !lat || !lng || !unit) {
            throw ApiError.BadRequest('You did not enter all necessary options.');
        }

        const radius = {
            mi: distance / 3963.2,
            km: distance / 6378.1,
        };

        const shops = await ShopsModel.find({
            location: { $geoWithin: { $centerSphere: [[lat, lng], radius[unit]] } },
        })
            .lean()
            .exec();

        return {
            shops,
            totalCounts: shops.length,
        };
    }

    async getShopsDistances({ lat, lng, unit }: DistancesInput) {
        if (!lat || !lng || !unit) {
            throw ApiError.BadRequest('You did not enter all necessary options.');
        }

        const multiplyBy = {
            km: 0.001,
            mi: 0.000621371,
        };

        const shops = await ShopsModel.aggregate([
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
            shops,
            totalCounts: shops.length,
        };
    }
}

export default new ShopService();
