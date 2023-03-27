import express from 'express'
import { UserModel } from '../models/user'
import TokenService from '../services/token'
import { ApiError } from '../exceptions/error';
import { JwtPayload } from 'jsonwebtoken';
import { ControllerRequest } from '../types/controllers';


export default async (req: ControllerRequest, res: express.Response, next: express.NextFunction) => {
    const BEARER = 'Bearer '
    const authHeader = req.headers.authorization

    const accessToken = authHeader && authHeader.startsWith(BEARER) && authHeader.split(' ')[1]
    const isAccessToken = accessToken && accessToken.length && accessToken.length === accessToken.trim().length 
    
    if (isAccessToken) {
        const isValidToken = TokenService.validateToken(accessToken)
        const userId = { _id: isValidToken && (isValidToken as JwtPayload).id }
        const userExists = await UserModel.exists(userId)

        if (!userExists) {
            throw ApiError.NotFound('User that belongs to this token was not found.')
        }

        req.user = isValidToken

        return next()
    }

    throw ApiError.UnAuthorized()
}