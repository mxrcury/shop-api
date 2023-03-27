import { User } from '../entities/user.entity';
import express from 'express';
import UsersService from '../services/user';
import { ControllerRequest, ControllerResponse, ItemsResponse } from '../types/controllers';
import { UsersResponse } from '../types/users';

export default new class UsersController {
    async getAll (req: ControllerRequest, res: express.Response<ItemsResponse<User>>): ControllerResponse<ItemsResponse<User>> {
        const { page, limit } = req.query

        const { users, totalCounts } = await UsersService.getUsers(+page, +limit)
        
        return res.status(200).send({
            items:users,
            totalCounts
        })
    }
    
    async getOne(req: express.Request, res: express.Response<User>): ControllerResponse<User> {
        const { id } = req.params
        
        const user = await UsersService.getUserById(id)

        return res.status(200).send(user)
    }

    async updateOne(req: express.Request, res: express.Response<void>): ControllerResponse<void> {
        const { id } = req.params
        const dataForUpdate = req.body

        await UsersService.updateUser(id, dataForUpdate)

        return res.status(201).send()
    }

    async updateMyProfile(req: express.Request, res: express.Response<void>): ControllerResponse<void> {
        const { id } = req.params
        const dataForUpdate = req.body

        await UsersService.updateUser(id, dataForUpdate)

        return res.status(201).send()
    }

    async deleteMyProfile(req: ControllerRequest, res: express.Response<void>): ControllerResponse<void> {
        const { id } = req.user

        await UsersService.deleteUser(id)

        return res.status(201).send()
    }

    async deleteOne(req: express.Request, res: express.Response<void>): ControllerResponse<void> {
        const { id } = req.params
        
        await UsersService.deleteUser(id)

        return res.status(200).send()
    }
}
