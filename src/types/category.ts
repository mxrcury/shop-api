import { ItemStatus } from './common';

export interface CategoryDto {
  name: string;
  currentUserId?: string;
  status: ItemStatus.Activated | ItemStatus.Requested;
}

export interface CategoryFilters {
  status: ItemStatus.Requested | ItemStatus.Activated;
}
