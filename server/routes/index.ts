import { Router } from 'express';
import { drawPandaName } from '../controllers/panda.controller';

export const router = Router();

router.get('/draw', drawPandaName);
