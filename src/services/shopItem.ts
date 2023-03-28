import { ShopItem } from '../entities/shopItems.entity';
import { ShopItemsModel } from '../models/shopItem';

class ShopItemService {
    async getShopItems (page?: number, limit: number = 0): Promise<any> {
        const shopItems = await ShopItemsModel.find().lean()
        // TODO:add pagination
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