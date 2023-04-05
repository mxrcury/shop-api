import { ShopItem } from '../entities/shopItem.entity';
import { Tag } from '../entities/tag.entitiy';
import { FiltersOptions, RegExInterface } from './common';

export enum SortByEnums {
  Price = 'price',
  CreatedAt = 'createdAt',
  Quantity = 'quantity',
}

export interface PartialShopItem extends Partial<ShopItem> {}

export interface UpdateShopItemOptions {
  id: string;
  updatedData: PartialShopItem;
}
interface SearchTitleInterface {
  searchFilter: { title: RegExInterface };
}

interface ShopItemFilters extends SearchTitleInterface {
  sortBy?: SortByEnums.Price | SortByEnums.CreatedAt | SortByEnums.Quantity;
}

export interface ShopItemsFilterInput extends FiltersOptions {
  filters?: ShopItemFilters;
}

export interface ShopItemInput {
  title: string;
  description: string;
  price: number;
  tags: Tag[];
  quantity: number;
  createdAt: Date;
  userId: string;
}
