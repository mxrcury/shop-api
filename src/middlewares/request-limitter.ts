import limitRate from 'express-rate-limit'

export const rateLimitter = limitRate({
    windowMs:15 * 60 * 1000,
    max:1000,
    standardHeaders:true,
    legacyHeaders:false,
    message:'Too many requests from this IP, please wait 15 minutes.'
})