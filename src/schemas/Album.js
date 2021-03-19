import { Schema, model } from 'mongoose';

const Album = new Schema({
  name: String,
  description: String,
  photos: { type: Array }
});

export default model('Album', Album);