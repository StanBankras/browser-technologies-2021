import { Schema, model } from 'mongoose';

const Photo = new Schema({
  base64: String
});

export default model('Photo', Photo);