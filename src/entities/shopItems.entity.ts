import { Tag } from "./tag.entitiy"
import { User } from "./user.entity"

export interface ShopItem {
    id?: string
    title: string
    description: string
    price: number
    tags: Tag[]
    quantity: number
    createdBy: User
    createdAt: number,
    userId:string
}