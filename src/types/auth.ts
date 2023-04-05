import { User } from '../models/user';

export interface LoginInput {
  email: string;
  password: string;
}

export interface PasswordsInput {
  currentPassword: string;
  newPassword: string;
  id: string;
}

export interface UserInput extends User {
  password: string;
  passwordConfirmed: string;
  photo?: string;
}

export interface ResetPassOptions {
  token: string;
  password: string;
}

export interface ForgotPassOptions {
  email: string;
  confirmUrl: string;
}
export interface SignUpOptions {
  userInput: UserInput;
  confirmUrl: string;
}
