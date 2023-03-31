import express from "express"
import { ApiError } from "../exceptions/error"

export default (err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(err)
    
    if (err.name === 'JsonWebTokenError') {
        res.status(401).send({
            statusCode: 401,
            status: 'You are not authorized.'
        })
    }

    if (err.name === 'TokenExpiredError') {
        res.status(401).send({
            statusCode: 401,
            status: 'Your token has been expired.'
        })
    }
    
    if (err.name === 'CastError') {
        res.status(500).send(ApiError.CastError(err))
    }
    
    if (err instanceof ApiError) {
        res.status(err.statusCode).send(err)
    }
    
    if (err instanceof Error) {
        res.status(500).send({
            statusCode: 500,
            status: 'Something went wrong.',
            errorMessage: err.message
        })
    }

    next()
}