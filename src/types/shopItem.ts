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

export interface ShopItemsFilterInput extends FiltersOptions {
    searchFilter?:{ title:RegExInterface }
}