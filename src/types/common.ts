export type RestFields<T> = { [key: string]: T }

export interface FiltersOptions<T = {}> {
    page?: number
    limit?: number
    filters?: T

export interface RegExInterface { $regex: string, $options: string }
