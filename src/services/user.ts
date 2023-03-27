import { UserModel } from '../models/user';
import { ApiError } from '../exceptions/error';
import { RestFields } from '../types/common'
import filterAllowedFields from '../utils/filterAllowedFields';
import { UsersResponse } from '../types/users';
import { User } from '../entities/user.entity';
import { allowedFields } from '../validation/user';

class UserService {
    async getUsers(page?: number, limit: number = 0): Promise<UsersResponse> {
        if (page && typeof page !== 'number') {
            throw ApiError.BadRequest()
        }
        const totalCounts = await UserModel.countDocuments()

        const users = (await UserModel
            .find()
            .limit(limit)
            .skip(limit * (page - 1))
            .select('-password')
            .select('-__v'))

        if (!users) {
            throw ApiError.NotFound()
        }

        // mb find another solution
        return { users: users as User[], totalCounts }
    }
    async getUserById(id: string): Promise<User> {
        const user = await UserModel
            .findById(id)
            .select('-password')
            .select('-__v')

        if (!user) {
            throw ApiError.NotFound('User not found')
        }

        return user as User
    }

    async updateUser(id: string, data: RestFields<any>): Promise<void> {
        const user = await UserModel.findByIdAndUpdate(id, data)

        if (!user) {
            throw ApiError.NotFound('User with such id not found')
        }

        return
    }

    async updateMyProfile(id: string, data: RestFields<any>): Promise<void> {
        const filteredData = filterAllowedFields(data, allowedFields)
        const user = await UserModel.findByIdAndUpdate(id, filteredData)

        if (!user) {
            throw ApiError.NotFound('User with such id not found')
        }

        return
    }

    async deleteUser(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id)
        return
    }
}

export default new UserService()