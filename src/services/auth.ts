import bcrypt from 'bcrypt';

import { UserModel } from '../models/user';
import { ApiError } from '../exceptions/error';
import {
  ForgotPassOptions,
  LoginInput,
  ResetPassOptions,
  SignUpOptions,
} from '../types/auth';
import TokenService from './token';
import { Tokens } from '../types/token';
import EmailService from './email';
import { ConfirmTokenModel } from '../models/confirmToken';
import validateDate from '../utils/validateDate';
import { PasswordsInput } from '../types/auth';
import {
  DOCUMENT_NOT_FOUND,
  TOKEN_NOT_FOUND,
  USER_NOT_FOUND_TOKEN,
} from '../constants';

class AuthService {
  async signUp({ userInput, confirmUrl }: SignUpOptions): Promise<void> {
    const { password, passwordConfirmed, email } = userInput;

    if (password !== passwordConfirmed) {
      throw ApiError.BadRequest('Passwords are not equal');
    }
    const userExists = await UserModel.exists({ email }).exec();

    if (userExists) {
      throw ApiError.BadRequest('User with this email already exists');
    }

    const hashingSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hashingSalt);

    const userPayload = { ...userInput, password: hashedPassword };

    const user = await UserModel.create(userPayload);

    const token = await TokenService.createConfirmToken(user.id);

    await EmailService.sendConfirmationEmail({
      to: user.email,
      confirmUrl: `${confirmUrl + token}`,
    });

    return;
  }
  async login(authInput: LoginInput): Promise<Tokens> {
    const { password, email } = authInput;

    if (!email || !password) {
      throw ApiError.BadRequest('You did not entered data.');
    }

    const user = await UserModel.findOne({ email })
      .select('+password +role')
      .exec();

    const userExists = user && user.email === email;

    if (!userExists) {
      throw ApiError.NotFound(DOCUMENT_NOT_FOUND(UserModel.modelName));
    }

    if (!user.confirmedEmail) {
      throw ApiError.BadRequest('You do not confirmed your email.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw ApiError.BadRequest('You entered wrong password.');
    }
    const payload = {
      id: user._id,
      role: user.role,
    };

    const tokens = await TokenService.generateTokens(payload);

    return tokens;
  }

  async confirmEmail(token: string): Promise<void> {
    const isTokenExists = await ConfirmTokenModel.findOne({ token });

    if (!isTokenExists) {
      throw ApiError.NotFound(TOKEN_NOT_FOUND);
    }

    await ConfirmTokenModel.deleteOne({ token });

    const user = await UserModel.findByIdAndUpdate(isTokenExists.userId, {
      confirmedEmail: true,
    }).exec();

    if (!user) {
      throw ApiError.NotFound(USER_NOT_FOUND_TOKEN);
    }

    return;
  }

  async forgotPassword({
    email,
    confirmUrl,
  }: ForgotPassOptions): Promise<void> {
    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
      throw ApiError.NotFound(DOCUMENT_NOT_FOUND(UserModel.modelName));
    }

    const token = await TokenService.createConfirmToken(user.id);

    await EmailService.sendForgotPassEmail({
      to: email,
      confirmUrl: confirmUrl + token,
    });

    return;
  }
  async resetPassword({ token, password }: ResetPassOptions): Promise<void> {
    const isTokenExists = await ConfirmTokenModel.findOne({ token }).exec();

    if (!isTokenExists) {
      throw ApiError.NotFound(TOKEN_NOT_FOUND);
    }
    await ConfirmTokenModel.deleteOne({ token }).exec();

    const isValidDate = validateDate(isTokenExists.expiringDate);

    if (!isValidDate) {
      throw ApiError.BadRequest('Your token has been expired.');
    }

    const hashingSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hashingSalt);

    const user = await UserModel.findByIdAndUpdate(isTokenExists.userId, {
      password: hashedPassword,
    }).exec();

    if (!user) {
      throw ApiError.NotFound(USER_NOT_FOUND_TOKEN);
    }

    return;
  }

  async changePassword({
    currentPassword,
    newPassword,
    id,
  }: PasswordsInput): Promise<void> {
    const user = await UserModel.findById(id).select('+password').exec();

    if (!user) {
      throw ApiError.NotFound(DOCUMENT_NOT_FOUND(UserModel.modelName));
    }
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isValidPassword) {
      throw ApiError.BadRequest('You entered wrong password.');
    }

    const hashingSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, hashingSalt);

    await UserModel.findByIdAndUpdate(id, { password: hashedPassword }).exec();

    return;
  }
  // async refresh () {}
}
export default new AuthService();
