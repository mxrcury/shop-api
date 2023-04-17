import express from 'express';
import { Tag } from '../models/tag';
import TagService from '../services/tag';
import { ItemStatus } from '../types/common';

import {
  ControllerRequest,
  ControllerResponse,
  ItemsResponse,
} from '../types/controllers';
import { Roles } from '../types/users';
import getRegex from '../utils/getRegex';

class TagController {
  async getAll(
    req: ControllerRequest,
    res: express.Response<ItemsResponse<Tag>>
  ): ControllerResponse<ItemsResponse<Tag>> {
    const { page, limit, name } = req.query;

    const filters = { searchFilter: { name: getRegex(name) } };

    const tags = await TagService.getTags({
      page: parseInt(page),
      limit: parseInt(limit),
      filters,
    });

    return res.status(200).send(tags);
  }
  async create(
    req: ControllerRequest,
    res: express.Response<void>
  ): ControllerResponse<void> {
    const { id: userId, role: userRole } = req.user;
    const dto = req.body;

    if (userRole !== Roles.Admin) {
      dto.status = ItemStatus.Requested;
      dto.userId = userId;
    }
    // if (dto.status) dto.userId = req.user.id;

    await TagService.createTag(dto);

    return res.status(201).send();
  }
}

export default new TagController();
