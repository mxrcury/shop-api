import { Tag, TagModel } from '../models/tag';
import { FiltersOptions } from '../types/common';
import { ItemsResponse } from '../types/controllers';
import { TagFilters } from '../types/tag';

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
}

export default new TagService();
