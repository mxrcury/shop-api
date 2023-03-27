import { User } from "../entities/user.entity"

export interface LoginInput {
    email:string
    password:string
}

export interface PasswordsInput { 
    currentPassword:string, 
    newPassword:string, 
    id:string
}

export interface UserInput extends User {
    password:string
    passwordConfirmed:string
    photo?:string
}