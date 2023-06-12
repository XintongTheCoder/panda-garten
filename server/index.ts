import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connect from './connect';
import { router } from './routes';
import cors from 'cors';

dotenv.config();

export const app: Application = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../../client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/pandas', router);

const db = 'mongodb://localhost:27017/panda';
connect({ db });
