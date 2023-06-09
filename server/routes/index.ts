import { Router } from 'express';
import { drawPandaName, drawPandas } from '../controllers/panda.controller';

export const router = Router();
router.get('/draw', drawPandaName);
router.get('/draw/:name', drawPandas);
