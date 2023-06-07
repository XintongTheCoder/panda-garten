import { model, Schema, connect } from 'mongoose';

interface Panda {
  name: String;
  photos: [String];
}

const pandaSchema = new Schema<Panda>({
  name: { type: String, required: true },
  photos: [String],
});

const Panda = model<Panda>('Panda', pandaSchema);
run().catch((err) => console.error(err.message));

async function run() {
  await connect('mongodb://localhost:27017/panda');
}
