import { ShopItem } from '../entities/shopItems.entity';
import { FiltersOptions, RegExInterface } from './common';

export interface CreatedByInterface {
    firstName:string,
    lastName:string, 
    email: string,
    photo: string
}

export interface ShopItemsResponse {
    shopItems:ShopItem[],
    totalCounts: number
}

export enum SortByEnums {
    Price = 'price',
    CreatedAt = 'createdAt',
    Quantity = 'quantity'
}

interface SearchTitleInterface { searchFilter:{ title:RegExInterface } }

interface ShopItemFilters extends SearchTitleInterface {
    sortBy?:SortByEnums.Price | SortByEnums.CreatedAt | SortByEnums.Quantity
}

export interface ShopItemsFilterInput extends FiltersOptions {
    filters?:ShopItemFilters,
}
