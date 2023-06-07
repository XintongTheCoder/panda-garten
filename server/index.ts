import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connect from './connect';
dotenv.config();

export const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const db = 'mongodb://localhost:27017/panda';
connect({ db });
