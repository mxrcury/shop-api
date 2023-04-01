import { Shop } from "../entities/shop.entity";
import { FiltersOptions, RegExInterface } from "./common";

export interface ShopFiltersInput extends FiltersOptions { filters:{ name:RegExInterface }} 

export interface ShopsResponse {
    shops:Shop[],
    totalCounts:number
}

export interface WithinOptions {
    unit: Units.Mi | Units.Km
}

export interface WithinParams extends WithinOptions { latlng: string, distance: string }

export interface WithinInput extends WithinOptions {
    lat:number,
    lng:number,
    distance:number
}

export enum Units {
    Mi = 'mi',
    Km = 'km'
}