import { ShopItem } from '../entities/shopItem.entity';
import { Tag } from '../entities/tag.entitiy';
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

export interface ShopItemInput {
    title:string,
    description: string,
    price: number,
    tags: Tag[],
    quantity: number,    
    createdAt: Date,
    userId:string
}
