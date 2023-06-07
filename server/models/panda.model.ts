import mongoose, { Document, Schema } from 'mongoose';

export interface Panda extends Document {
  name: string;
  photo: string[];
}

const PandaSchema: Schema = new Schema({
  name: { type: String, required: true },
  photos: [String],
});

export default mongoose.model<Panda>('Panda', PandaSchema);
