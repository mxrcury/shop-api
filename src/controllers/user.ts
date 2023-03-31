import { User } from '../entities/user.entity';
import express from 'express';
import UsersService from '../services/user';
import { ControllerRequest, ControllerResponse, ItemsResponse } from '../types/controllers';

export default new class UsersController {
    async getAll (req: ControllerRequest, res: express.Response<ItemsResponse<User>>): ControllerResponse<ItemsResponse<User>> {
        const { page, limit } = req.query

        const { users, totalCounts } = await UsersService.getUsers({ page:parseInt(page), limit:parseInt(limit)})
        
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

    async updateMe(req: express.Request, res: express.Response<void>): ControllerResponse<void> {
        const { id } = req.params
        const dataForUpdate = req.body

        await UsersService.updateMe(id, dataForUpdate)

        return res.status(201).send()
    }

    async deleteMe(req: ControllerRequest, res: express.Response<void>): ControllerResponse<void> {
        const { id } = req.user
        const { password } = req.body

        await UsersService.deleteUser({id, password})

        return res.status(201).send()
    }

    async deleteOne(req: express.Request, res: express.Response<void>): ControllerResponse<void> {
        const { id } = req.params
        
        await UsersService.deleteUser({ id })

        return res.status(200).send()
    }
}
