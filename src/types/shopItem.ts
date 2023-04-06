import { ObjectId } from 'mongoose';
import { ShopItem } from '../models/shopItem';
import { Tag } from '../models/tag';
import { FiltersOptions, RegExInterface } from './common';

export enum SortByEnums {
  Price = 'price',
  CreatedAt = 'createdAt',
  Quantity = 'quantity',
}

export interface PartialShopItem extends Partial<ShopItem> { }

export interface UpdateShopItemOptions {
  id: string;
  updatedData: PartialShopItem;
  currentUserId: ObjectId;
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
