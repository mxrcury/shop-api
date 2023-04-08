export interface CategoryInput {
  name: string;
  currentUserId?: string;
  status: CategoryStatus.Activated | CategoryStatus.Requested;
}

export enum CategoryStatus {
  Activated = 'activated',
  Requested = 'requested',
}

export interface CategoryFilters {
  status: CategoryStatus.Requested | CategoryStatus.Activated;
}
