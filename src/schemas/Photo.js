import { Schema } from 'mongoose';

const Photo = new Schema({
  id: String,
  order: { type: Number, min: 0, unique: true },
  name: { type: String, required: false },
  description: { type: String, required: false },
  alt: { type: String, required: false },
  location: { type: String, required: false },
  author: { type: String, required: false },
  base64: String
});

export default Photo;