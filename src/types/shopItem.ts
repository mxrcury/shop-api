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

export interface ShopItemFilters {
  sortBy?: SortByEnums.Price | SortByEnums.CreatedAt | SortByEnums.Quantity;
  searchFilter?: { title: RegExInterface; categoryId: string };
}

export interface ShopItemInput {
  title: string;
  description: string;
  price: number;
  tags: string[];
  quantity: number;
  createdAt: Date;
  categoryId: string;
  authorId: string;
}
