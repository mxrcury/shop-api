import { Shop } from "../entities/shop.entity";
import { FiltersOptions, RegExInterface } from "./common";

export interface ShopFiltersInput extends FiltersOptions { filters:{ name:RegExInterface }} 

export interface ShopsResponse {
    shops:any,
    // Shop[],
    totalCounts:number
}
export interface WithinParams { unit: Units.Mi | Units.Km, latlng: string, distance: string }

export enum Units {
    Mi = 'mi',
    Km = 'km'
}