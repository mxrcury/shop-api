import { Category, CategoryModel } from '../models/category';
import {
  CategoryFilters,
  CategoryInput,
  CategoryStatus,
} from '../types/category';
import { ItemsResponse } from '../types/controllers';

class CategoryService {
  async getCategories({
    status = CategoryStatus.Activated,
  }: CategoryFilters): Promise<ItemsResponse<Category>> {
    const items = await CategoryModel.find({ status });
    const totalCounts = await CategoryModel.countDocuments();

    return {
      items,
      totalCounts,
    };
  }
  async createCategory(categoryInput: CategoryInput): Promise<void> {
    const {
      name,
      status = CategoryStatus.Activated,
      currentUserId,
    } = categoryInput;

    await CategoryModel.create({ name, status, currentUserId });

    return;
  }
}

export default new CategoryService();
