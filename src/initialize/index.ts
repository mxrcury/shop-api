import mongoose from "mongoose"
import express from "express"
import path from "path"
import dotenv from 'dotenv'

import cookieParser from "cookie-parser"
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import xss from "xss-clean"

import { rootRouter } from "../routes/root"
import notFoundRoute from "../middlewares/not-found-route"
import errorHandler from "../middlewares/error-handler"
import { rateLimitter } from "../middlewares/request-limitter"

dotenv.config()

const start = async (app: express.Express, port: string | number = 7000) => {
    try {
        const dirname = path.resolve('./')

        app.use(express.static(`${dirname}/public`))
        app.use(express.json({ limit: '10kb' }) )
        app.use(mongoSanitize())
        app.use(xss())
        app.use(hpp())
        app.use(cookieParser())
        app.use(rateLimitter)

        app.use('/',rootRouter)
        
        app.use(notFoundRoute)
        app.use(errorHandler)
        
        await mongoose.connect(process.env.DB.replace('<PASSWORD>', process.env.DB_PASS), {
            retryWrites: true,
            monitorCommands: true
        })
        console.log(`Successfully connected to MongoDB `)
        
        app.listen(port, () => console.log(`Server started on port ${port}`))
        
    } catch (error) {
        console.log(error)
    }
}
export default start