import { Schema, model } from 'mongoose';

const User = new Schema({
  name: String,
  albums: { type: Array }
});

export default model('User', User);