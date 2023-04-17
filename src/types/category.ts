import { ItemStatus } from './common';

export interface CategoryDto {
  name: string;
  userId?: string;
  status: ItemStatus.Activated | ItemStatus.Requested;
}

export interface CategoryFilters {
  status: ItemStatus.Requested | ItemStatus.Activated;
}
