import express from 'express';
import { asyncWrapper } from '../utils/asyncWrapper';
import TagController from '../controllers/tag';

const tagsRouter = express.Router();

tagsRouter.get('/', asyncWrapper(TagController.getAll));

export { tagsRouter };
