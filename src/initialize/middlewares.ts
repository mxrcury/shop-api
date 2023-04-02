import cookieParser from 'cookie-parser';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp'
import cors from 'cors'
import { rateLimitter } from '../middlewares/request-limitter';

export default (app: express.Express) => {
    app.use(express.json({ limit: '10kb' }))
    app.use(cors())
    app.use(mongoSanitize())
    app.use(xss())
    app.use(hpp())
    app.use(cookieParser())
    app.use(rateLimitter)
}
