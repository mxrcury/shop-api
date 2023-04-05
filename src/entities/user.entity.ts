import { RolesType } from '../types/users';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: RolesType;
  photo?: string;
  confirmedEmail: boolean;
}
