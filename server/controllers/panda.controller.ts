import { Request, Response } from 'express';
import { IPanda } from '../types';
import PandaModel from '../models/panda.model';

export function drawPandaName(req: Request, res: Response): void {
  console.log('in controller');
  PandaModel.aggregate([{ $sample: { size: 1 } }])
    .exec()
    .then((pandas: IPanda[]) => pandas[0].name)
    .then((name) => {
      res.status(200).json({ name });
    })
    .catch((err) => {
      console.error("Failed to draw panda's name: ", err.message);
      res.sendStatus(400);
    });
}

export async function drawPandas(req: Request, res: Response): Promise<void> {
  const name = req.params.name;
  const count = Number(req.query.count);
  const pandaSet = new Set<string>();
  const pandas: IPanda[] = [];
  try {
    const targetPanda = await PandaModel.findOne({ name }).exec();
    if (!targetPanda) {
      throw new Error();
    }
    pandas.push(targetPanda);
    pandaSet.add(name);
    while (pandaSet.size < count) {
      const restPandas = await PandaModel.aggregate([
        { $sample: { size: count - pandaSet.size } },
      ]).exec();
      restPandas.forEach((panda) => {
        if (!pandaSet.has(panda.name)) {
          pandas.push(panda);
          pandaSet.add(panda.name);
        }
      });
    }
    const result = pandas.map((panda) => ({
      name: panda.name,
      photo: panda.photos[Math.floor(Math.random() * panda.photos.length)],
    }));
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Failed to draw panda's name: ", err.message);
    }
    res.sendStatus(400);
  }
}
