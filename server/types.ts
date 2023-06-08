import { Document } from 'mongoose';

export interface IPanda extends Document {
  name: string;
  photos: string[];
}
