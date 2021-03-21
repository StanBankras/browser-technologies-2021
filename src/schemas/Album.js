import { Schema } from 'mongoose';
import Photo from './Photo';

const Album = new Schema({
  id: String,
  name: String,
  description: String,
  photos: [Photo]
});

export default Album;