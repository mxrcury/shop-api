import express from 'express';
import path from 'path';

export default (app: express.Express) => {
    app.set('view engine', 'pug')
    app.set('views', path.resolve('src', 'views'))
}
