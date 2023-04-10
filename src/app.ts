import express from 'express';
import start from './initialize';

const PORT = process.env.PORT;

const app = express();

start(app, PORT);
