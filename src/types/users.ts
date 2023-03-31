import { User } from "../entities/user.entity"
import { FiltersOptions } from "./common"

export enum Roles {
    Admin = 'admin',
    Guest = 'guest'
}
export type RolesType = Roles.Admin | Roles.Guest


export interface UsersResponse {
    users:User[],
    totalCounts:number
}

export interface DeleteUserInput { id:string, password?:string }

export interface UsersFilterInput extends FiltersOptions {}