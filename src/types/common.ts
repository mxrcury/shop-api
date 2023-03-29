export type RestFields<T> = { [key:string]: T}

export interface FiltersOptions{
    page?:number
    limit?: number
}

export interface RegExInterface { $regex:string, $options: string}