import { DOCUMENT_NOT_FOUND } from '../constants';
import { ApiError } from '../exceptions/error';
import { ShopItem, ShopItemsModel } from '../models/shopItem';
import { FiltersOptions } from '../types/common';
import { ItemsResponse } from '../types/controllers';
import {
  ShopItemFilters,
  ShopItemInput,
  SortByEnums,
  UpdateShopItemOptions,
} from '../types/shopItem';

class ShopItemService {
  async getShopItems({
    page = 0,
    limit = 0,
    filters,
  }: FiltersOptions<ShopItemFilters>): Promise<ItemsResponse<ShopItem>> {
    const { searchFilter, sortBy = SortByEnums.CreatedAt } = filters;

    const items = (await ShopItemsModel.find(searchFilter)
      .sort([[sortBy, -1]])
      .limit(limit)
      .skip(limit * page)
      .lean()) as ShopItem[];

    const totalCounts = await ShopItemsModel.countDocuments();
    return { items, totalCounts };
  }

  async createShopItem(shopItemInput: ShopItemInput): Promise<void> {
    const { title, price, quantity, description, userId, categoryId } =
      shopItemInput;
    await ShopItemsModel.create({
      title,
      price,
      quantity,
      description,
      userId,
      categoryId,
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
