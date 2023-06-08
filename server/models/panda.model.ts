import mongoose, { Schema } from 'mongoose';
import { IPanda } from '../types';

const PandaSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  photos: [String],
});

export default mongoose.model<IPanda>('Panda', PandaSchema);
