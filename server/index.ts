import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connect from './connect';
import { router } from './routes';

dotenv.config();

export const app: Application = express();
app.use(express.static(path.join(__dirname, '../../client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/', (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
// });

app.use('/api/pandas', router);

const db = 'mongodb://localhost:27017/panda';
connect({ db });
