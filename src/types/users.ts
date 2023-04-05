import { User } from '../entities/user.entity';
import { FiltersOptions } from './common';

export enum Roles {
  Admin = 'admin',
  Guest = 'guest',
}
export type RolesType = Roles.Admin | Roles.Guest;

export interface DeleteUserInput {
  id: string;
  password?: string;
}

export interface UsersFilterInput extends FiltersOptions {}

export interface PartialUser extends Partial<User> {}

export interface UpdateUserOptions {
  id: string;
  dataForUpdate: PartialUser;
}
