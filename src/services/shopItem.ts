import { ShopItem } from '../entities/shopItem.entity';
import { ShopItemsModel } from '../models/shopItem';
import { RestFields } from '../types/common';
import { ShopItemInput, ShopItemsFilterInput, ShopItemsResponse } from '../types/shopItem';

class ShopItemService {
    async getShopItems({ page = 0, limit = 0, filters }: ShopItemsFilterInput): Promise<ShopItemsResponse> {
        const shopItems = await ShopItemsModel
            .find(filters.searchFilter)
            .sort([[filters.sortBy, -1]])
            .limit(limit)
            .skip(limit * page)
            .lean() as ShopItem[]

        const totalCounts = await ShopItemsModel.countDocuments()
        return { shopItems, totalCounts }
    }
    
    async createShopItem({ title, price, quantity, description, userId }: ShopItemInput): Promise<void> {
        await ShopItemsModel.create({ title, price, quantity, description, userId })
        return
    }
    
    async getShopItem(id: string): Promise<ShopItem> {
        const shopItem = await ShopItemsModel.findById(id).lean() as ShopItem
        return shopItem
    }

    async updateShopItem(id:string, updatedData:RestFields<any>): Promise<void> {
        await ShopItemsModel.findByIdAndUpdate(id, updatedData).exec()
        return
    }

    async deleteShopItem(id:string): Promise<void> {
        await ShopItemsModel.findByIdAndRemove(id)
        return 
    }
}

export default new ShopItemService()