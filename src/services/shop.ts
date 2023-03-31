import { Shop, ShopsModel } from "../models/shop";
import { ShopFiltersInput, ShopsResponse } from "../types/shop";

class ShopService {
    async getShops({ page = 0, limit = 0, filters }: ShopFiltersInput): Promise<ShopsResponse> {
        const shops = await ShopsModel.find(filters).skip(page * limit).limit(limit).lean().exec()

        const totalCounts = await ShopsModel.countDocuments()

        return {
            shops: shops as any,
            totalCounts
        }
    }

    async createShop({ name, location }: { name: string, location: string }): Promise<void> {
        console.log({ name, location });

        await ShopsModel.create({ name, location })

        return
    }

    async getShopsWithin({ distance, lat, lng, unit }: { distance: number, lat: number, lng: number, unit: 'mi' | 'km' }): Promise<ShopsResponse> {
        const radius = {
            mi: distance / 3963.2,
            km: distance / 6378.1
        }
        console.log(radius[unit])
        const shops = await ShopsModel.find({ location: { $geoWithin: { $centerSphere: [[lat, lng], radius[unit]] } } }).lean().exec()

        return {
            shops,
            totalCounts: shops.length
        }
    }
}

export default new ShopService()