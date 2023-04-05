import express from "express"
import { ApiError } from "../exceptions/error"

export default (err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {

    if(process.env.NODE_ENV === 'development') {
        console.log(err)
    }

    const errors = {
        JsonWebTokenError:() => {
            res.status(401).send({
                statusCode: 401,
                status: 'You are not authorized.'
            })
        },
        TokenExpiredError:() => {
            res.status(401).send({
                statusCode: 401,
                status: 'Your token has been expired.'
            })
        },
        CastError:() => {
            res.status(500).send(ApiError.CastError(err))
        }
    }
    if(errors[err.name]) errors[err.name]()
    
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