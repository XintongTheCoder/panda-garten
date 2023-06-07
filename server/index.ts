import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
