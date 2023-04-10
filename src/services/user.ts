import bcrypt from 'bcrypt';

import { UserModel } from '../models/user';
import { ApiError } from '../exceptions/error';
import filterAllowedFields from '../utils/filterAllowedFields';
import {
  DeleteUserInput,
  UpdateUserOptions,
  UsersFilterInput,
} from '../types/users';
import { User } from '../models/user';
import { allowedFields } from '../validation/body/user';
import { ItemsResponse } from '../types/controllers';
import { DOCUMENT_NOT_FOUND } from '../constants';

class UserService {
  async getUsers({
    page,
    limit = 0,
  }: UsersFilterInput): Promise<ItemsResponse<User>> {
    const totalCounts = await UserModel.countDocuments();

    const items = (await UserModel.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .select('-role')
      .select('-__v')
      .lean()
      .exec()) as User[];

    return { items, totalCounts };
  }
  async getUserById(id: string): Promise<User> {
    const user = (await UserModel.findById(id).select('-__v')) as User;

    if (!user) {
      throw ApiError.NotFound(DOCUMENT_NOT_FOUND(UserModel.modelName));
    }

    return user;
  }

  async updateUser({ id, dataForUpdate }: UpdateUserOptions): Promise<void> {
    const user = await UserModel.findByIdAndUpdate(id, dataForUpdate);

    if (!user) {
      throw ApiError.NotFound(DOCUMENT_NOT_FOUND(UserModel.modelName));
    }

    return;
  }

  async updateMe({ id, dataForUpdate }: UpdateUserOptions): Promise<void> {
    const filteredData = filterAllowedFields(dataForUpdate, allowedFields);
    const user = await UserModel.findByIdAndUpdate(id, filteredData);

    if (!user) {
      throw ApiError.NotFound(DOCUMENT_NOT_FOUND(UserModel.modelName));
    }

    return;
  }

  async deleteUser({ id, password }: DeleteUserInput): Promise<void> {
    const user = await UserModel.findById(id).lean().exec();

    if (!user) {
      throw ApiError.NotFound(DOCUMENT_NOT_FOUND(UserModel.modelName));
    }

    if (password) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        await UserModel.findByIdAndDelete(id);
        return;
      }
    }
    throw ApiError.BadRequest('You entered wrong password.');
  }
}

export default new UserService();
