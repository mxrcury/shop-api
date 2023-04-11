import { User } from '../models/user';
import express from 'express';
import UsersService from '../services/user';
import {
  ControllerRequest,
  ControllerResponse,
  ItemsResponse,
} from '../types/controllers';
import { Roles } from '../types/users';
import { ApiError } from '../exceptions/error';

class UserController {
  async getAll(
    req: ControllerRequest,
    res: express.Response<ItemsResponse<User>>
  ): ControllerResponse<ItemsResponse<User>> {
    const { page, limit } = req.query;

    const users = await UsersService.getUsers({
      page: parseInt(page),
      limit: parseInt(limit),
    });

    return res.status(200).send(users);
  }

  async getOne(
    req: express.Request,
    res: express.Response<User>
  ): ControllerResponse<User> {
    const { id } = req.params;

    const user = await UsersService.getUserById(id);

    return res.status(200).send(user);
  }

  async updateOne(
    req: ControllerRequest,
    res: express.Response<void>
  ): ControllerResponse<void> {
    const { id } = req.params;
    const dataForUpdate = req.body;
    const { id: currentUserId, role: currentUserRole } = req.user;

    if (currentUserId !== id && currentUserRole !== Roles.Admin)
      throw ApiError.Forbidden();

    if (req.file) dataForUpdate.photo = req.file.filename;

    await UsersService.updateUser({ id, dataForUpdate });

    return res.status(201).send();
  }

  async deleteOne(
    req: ControllerRequest,
    res: express.Response<void>
  ): ControllerResponse<void> {
    const { id } = req.params;
    const { role: currentUserRole } = req.user;
    const { password } = req.body;

    if (currentUserRole !== Roles.Admin) throw ApiError.Forbidden();

    if (currentUserRole !== Roles.Admin && !password)
      throw ApiError.BadRequest(
        'You did not enter your password for confirmation.'
      );
    await UsersService.deleteUser({ id, password });

    return res.status(200).send();
  }
}

export default new UserController();
