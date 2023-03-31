import bcrypt from 'bcrypt'

import { UserModel } from '../models/user';
import { ApiError } from '../exceptions/error';
import { RestFields } from '../types/common'
import filterAllowedFields from '../utils/filterAllowedFields';
import { DeleteUserInput, UsersFilterInput, UsersResponse } from '../types/users';
import { User } from '../entities/user.entity';
import { allowedFields } from '../validation/body/user';

class UserService {
    async getUsers({ page, limit = 0 }:UsersFilterInput): Promise<UsersResponse> {
        const totalCounts = await UserModel.countDocuments()

        const users = await UserModel
            .find()
            .limit(limit)
            .skip(limit * (page - 1))
            .select('-password')
            .select('-role')
            .select('-__v').lean() as User[]

        if (!users) {
            throw ApiError.NotFound()
        }

        return { users, totalCounts }
    }
    async getUserById(id: string): Promise<User> {
        const user = await UserModel
            .findById(id)
            .select('-password')
            .select('-__v') as User

        if (!user) {
            throw ApiError.NotFound('User not found')
        }

        return user
    }

    async updateUser(id: string, data: RestFields<any>): Promise<void> {
        const user = await UserModel.findByIdAndUpdate(id, data)

        if (!user) {
            throw ApiError.NotFound('User with such id not found')
        }

        return
    }

    async updateMe(id: string, data: RestFields<any>): Promise<void> {
        const filteredData = filterAllowedFields(data, allowedFields)
        const user = await UserModel.findByIdAndUpdate(id, filteredData)

        if (!user) {
            throw ApiError.NotFound('User with such id not found.')
        }

        return
    }

    async deleteUser({ id, password }: DeleteUserInput): Promise<void> {
        const user = await UserModel.findById(id).lean()
        
        if(!user) {
            throw ApiError.NotFound('User with such ID not found.')
        }

        if(password) {
            const isValidPassword = await bcrypt.compare(password,user.password)
        
            if(!isValidPassword) {
                throw ApiError.BadRequest('You entered wrong password.')
            }
    
        }

        await UserModel.findByIdAndDelete(id)
        return
    }
}

export default new UserService()