import { DOCUMENT_NOT_FOUND } from '../constants';
import { ApiError } from '../exceptions/error';
import { ShopItem, ShopItemsModel } from '../models/shopItem';
import { ItemsResponse } from '../types/controllers';
import {
  ShopItemInput,
  ShopItemsFilterInput,
  UpdateShopItemOptions,
} from '../types/shopItem';

class ShopItemService {
  async getShopItems({
    page = 0,
    limit = 0,
    filters,
  }: ShopItemsFilterInput): Promise<ItemsResponse<ShopItem>> {
    const items = (await ShopItemsModel.find(filters.searchFilter)
      .sort([[filters.sortBy, -1]])
      .limit(limit)
      .skip(limit * page)
      .lean()) as ShopItem[];

    const totalCounts = await ShopItemsModel.countDocuments();
    return { items, totalCounts };
  }

  async createShopItem(shopItemInput: ShopItemInput): Promise<void> {
    const { title, price, quantity, description, userId } = shopItemInput;
    await ShopItemsModel.create({
      title,
      price,
      quantity,
      description,
      userId,
    });
    return;
  }

  async getShopItem(id: string): Promise<ShopItem> {
    const shopItem = (await ShopItemsModel.findById(id).lean()) as ShopItem;

    return shopItem;
  }

  async updateShopItem({
    id,
    updatedData,
    currentUserId,
  }: UpdateShopItemOptions): Promise<void> {
    const shopItem = await ShopItemsModel.findById(id)
      .select('authorId')
      .exec();

    if (!shopItem) {
      throw ApiError.NotFound(DOCUMENT_NOT_FOUND(ShopItemsModel.modelName));
    }

    if (shopItem.authorId.id !== currentUserId) throw ApiError.Forbidden();

    await ShopItemsModel.findByIdAndUpdate(id, updatedData);

    return;
  }

  async deleteShopItem(id: string): Promise<void> {
    const shopItem = await ShopItemsModel.findByIdAndRemove(id);

    if (!shopItem)
      throw ApiError.NotFound(DOCUMENT_NOT_FOUND(ShopItemsModel.modelName));

    return;
  }
}

export default new ShopItemService();
