import { Schema, model } from 'mongoose';
import Album from './Album';

const User = new Schema({
  name: String,
  albums: [Album]
});

export default model('User', User);