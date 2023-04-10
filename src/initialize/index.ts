import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import { rootRouter } from '../routes/root';
import notFoundRoute from '../middlewares/not-found-route';
import errorHandler from '../middlewares/error-handler';
import templatesInit from './templates';
import { templatesRouter } from '../routes/templates';
import middlewaresInit from './middlewares';
import swaggerSettings from '../../swagger-settings';

dotenv.config();

const start = async (app: express.Express, port: string | number = 7000) => {
  try {
    app.use('/public', express.static(`${path.resolve('./')}/public`));

    templatesInit(app);
    middlewaresInit(app);

    app.use('/', templatesRouter);
    app.use('/', rootRouter);
    const swaggerOptions = swaggerJsDoc(swaggerSettings);
    // app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions));
    app.use('*', notFoundRoute);
    app.use(errorHandler);

    await mongoose.connect(
      process.env.DB.replace('<PASSWORD>', process.env.DB_PASS),
      {
        retryWrites: true,
        monitorCommands: true,
      }
    );
    console.log(`Successfully connected to MongoDB `);
    app.listen(port, () => console.log(`Server started on ${port}`));
  } catch (error) {
    console.log('!\nApplication initializing error\n ->', error, '\n<-');
  }
};
export default start;
