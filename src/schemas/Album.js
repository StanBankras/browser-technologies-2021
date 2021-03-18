import { Schema, model } from 'mongoose';

const Album = new Schema({
  name: String,
  description: String,
  photoIds: { type: Array }
});

export default model('Album', Album);