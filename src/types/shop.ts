import { FiltersOptions, RegExInterface } from './common';

export interface ShopFiltersInput extends FiltersOptions {
  filters: { name: RegExInterface };
}

export interface GeoOptions {
  unit: Units.Mi | Units.Km;
}

export interface WithinParams extends GeoOptions {
  latlng: string;
  distance: string;
}

export interface WithinInput extends GeoOptions {
  lat: number;
  lng: number;
  distance: number;
}

export interface DistancesParams extends GeoOptions {
  latlng: string;
}

export interface DistancesInput extends GeoOptions {
  lat: number;
  lng: number;
}

export enum Units {
  Mi = 'mi',
  Km = 'km',
}
