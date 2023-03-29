import { ShopItem } from '../entities/shopItems.entity';
import { ShopItemsModel } from '../models/shopItem';
import { ShopItemsFilterInput } from '../types/shopItem';

class ShopItemService {
    async getShopItems ({page = 0, limit = 0, searchFilter }:ShopItemsFilterInput): Promise<any> {
        const shopItems = await ShopItemsModel.find(searchFilter).limit(limit).skip(limit * page).lean()

        const totalCounts = await ShopItemsModel.countDocuments()
        return { shopItems, totalCounts}
    }
    async createShopItem ({ title, createdAt, price, quantity, description, userId }:ShopItem):Promise<void> {
        const shopItem = await ShopItemsModel.create({title, createdAt, price, quantity, description, userId})
        console.log(shopItem)
        return
    }
    async getShopItemById (id:string):Promise<ShopItem> {
        const shopItem = await ShopItemsModel.findById(id) as ShopItem
        return shopItem
    }
}

export default new ShopItemService()