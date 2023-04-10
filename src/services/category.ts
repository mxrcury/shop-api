import { Category, CategoryModel } from '../models/category';
import { CategoryFilters, CategoryDto } from '../types/category';
import { ItemStatus } from '../types/common';
import { ItemsResponse } from '../types/controllers';

class CategoryService {
  async getCategories({
    status = ItemStatus.Activated,
  }: CategoryFilters): Promise<ItemsResponse<Category>> {
    const items = await CategoryModel.find({ status });
    const totalCounts = await CategoryModel.countDocuments();

    return {
      items,
      totalCounts,
    };
  }
  async createCategory(dto: CategoryDto): Promise<void> {
    const { name, status = ItemStatus.Activated, currentUserId } = dto;

    await CategoryModel.create({ name, status, currentUserId });

    return;
  }
}

export default new CategoryService();
