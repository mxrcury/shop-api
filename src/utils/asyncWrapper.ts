import express from 'express';

export const asyncWrapper = (callback: any) => {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            await callback(req, res, next);
        } catch (e) {
            next(e);
        }
    };
};
