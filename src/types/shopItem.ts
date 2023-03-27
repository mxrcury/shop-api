import { ShopItem } from '../entities/shopItems.entity';

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