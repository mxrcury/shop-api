import { ObjectId } from "mongodb";
import { RolesType } from "./users";

export interface UserPayload {
    id:ObjectId,
    role:RolesType
}

export interface Tokens {
    accessToken:string
    refreshToken?:string
}