import express from 'express';
import CategoryService from '../services/category';
import { Category } from '../models/category';

import {
  ControllerRequest,
  ControllerResponse,
  ItemsResponse,
} from '../types/controllers';
import { Roles } from '../types/users';
import { ItemStatus } from '../types/common';

class CategoryController {
  async getAll(
    req: ControllerRequest,
    res: express.Response<ItemsResponse<Category>>
  ): ControllerResponse<ItemsResponse<Category>> {
    const { status } = req.query;

    const filters = { status };

    const categories = await CategoryService.getCategories(filters);

    return res.status(200).send(categories);
  }
  async create(
    req: ControllerRequest,
    res: express.Response<void>
  ): ControllerResponse<void> {
    const { id: currentUserId, role: currentUserRole } = req.user;
    const categoryInput = req.body;

    if (currentUserRole !== Roles.Admin) {
      categoryInput.status = ItemStatus.Requested;
      categoryInput.currentUserId = currentUserId;
    }

    await CategoryService.createCategory(categoryInput);

    return res.status(201).send();
  }
}

export default new CategoryController();
