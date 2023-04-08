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
    const { name } = categoryInput;

    await CategoryModel.create({ name });

    return;
  }
  async sendCategoryRequest(categoryInput: CategoryInput): Promise<void> {
    await CategoryModel.create({
      ...categoryInput,
      status: CategoryStatus.Requested,
    });

    return;
  }
}

export default new CategoryService();
