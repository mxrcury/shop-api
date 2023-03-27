import express from 'express';
import { ControllerRequest } from '../types/controllers';
import { ApiError } from '../exceptions/error';
import { RolesType } from '../types/users';

export default (...roles:RolesType[]) => {
    return (req:ControllerRequest , res:express.Response, next:express.NextFunction) => {
        if(!roles.includes(req.user.role)) {
            throw ApiError.Forbidden()
        }
        next()
    }
}