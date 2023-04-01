import express from 'express'

const templatesRouter = express.Router()

templatesRouter.get('/', async (req:express.Request,res:express.Response) => {
    res.status(200).render('base')
})
templatesRouter.get('/docs', async (req:express.Request,res:express.Response) => {
    res.status(200).render('docs')
})

export { templatesRouter }