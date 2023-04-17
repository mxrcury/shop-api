import { ItemStatus, RegExInterface } from './common';

export interface TagFilters {
  searchFilter?: { name: RegExInterface };
}

export interface TagDto {
  name: string;
  status: ItemStatus.Activated | ItemStatus.Requested;
  userId?: string;
}
