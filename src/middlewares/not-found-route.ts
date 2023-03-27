import express from "express"

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).json({
        statusCode: 404,
        status: 'NOT_FOUND',
        errorMessage: 'Cant get ' + req.method + ' ' + req.url
    }).end()
}