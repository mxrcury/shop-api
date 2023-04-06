import { User } from '../models/user';
import { FiltersOptions } from './common';

export enum Roles {
  Admin = 'admin',
  Guest = 'guest',
  Seller = 'seller',
}
export type RolesType = Roles.Admin | Roles.Guest | Roles.Seller;

export interface DeleteUserInput {
  id: string;
  password?: string;
}

export interface UsersFilterInput extends FiltersOptions { }

export interface PartialUser extends Partial<User> { }

export interface UpdateUserOptions {
  id: string;
  dataForUpdate: PartialUser;
}
