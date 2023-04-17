import { Tag, TagModel } from '../models/tag';
import { FiltersOptions, ItemStatus } from '../types/common';
import { ItemsResponse } from '../types/controllers';
import { TagDto, TagFilters } from '../types/tag';

class TagService {
  async getTags({
    page = 0,
    limit = 0,
    filters,
  }: FiltersOptions<TagFilters>): Promise<ItemsResponse<Tag>> {
    const { searchFilter } = filters;
    const items = await TagModel.find(searchFilter)
      .skip(limit * page)
      .limit(limit);

    const totalCounts = await TagModel.countDocuments();

    return { items, totalCounts };
  }
  async createTag(dto: TagDto): Promise<void> {
    const { name, status = ItemStatus.Activated, userId } = dto;

    await TagModel.create({ name, status, userId });

    return;
  }
}

export default new TagService();
