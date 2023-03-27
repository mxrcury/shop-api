import { User } from "../entities/user.entity"

export enum Roles {
    Admin = 'admin',
    Guest = 'guest'
}
export type RolesType = Roles.Admin | Roles.Guest


export interface UsersResponse {
    users:User[],
    totalCounts:number
}
