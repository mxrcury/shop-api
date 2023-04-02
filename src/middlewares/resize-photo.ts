import sharp from "sharp";
import { ControllerRequest } from "../types/controllers";
import express from 'express';
import { asyncWrapper } from "../utils/asyncWrapper";

export const resizeUserPhoto = asyncWrapper( async (req: ControllerRequest, res: express.Response, next: express.NextFunction) => {
    if (!req.file) return next()
    const userId = req.user ? req.user.id : req.params.id
    const filename = `user-${userId}-${Date.now()}.jpeg`

    req.file.filename = filename

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg').jpeg({ quality: 90 })
        .toFile(`public/img/users/${filename}`)
    next()
})

export const resizeShopItemPhotos =  asyncWrapper(async (req: ControllerRequest, res: express.Response, next: express.NextFunction) => {
    if (!req.files.length) return next()

    req.body.images = []
    const files = req.files as any[]
    
    await Promise.all(files.map( async (file, index) => {
        const filename = `shopItem-${req.params.id}-${Date.now()}-${index + 1}.jpeg`
        
        req.body.images.push(filename)

        await sharp(file.buffer)
        .resize(500, 500)
        .toFormat('jpeg').jpeg({ quality: 90 })
        .toFile(`public/img/shopItem/${filename}`)
    }))

    next()
})