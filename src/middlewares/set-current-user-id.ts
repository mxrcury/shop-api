import express from 'express'

import { ControllerRequest } from "../types/controllers";

export default (req: ControllerRequest, res: express.Response, next: express.NextFunction) => {
    req.params.id = req.user.id

    next()
}
