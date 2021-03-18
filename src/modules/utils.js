import fs from 'fs';
import mongoose from 'mongoose';

export function getBase64FromPath(path) {
  const base64 = new Buffer.from(fs.readFileSync(path)).toString('base64');
  fs.unlinkSync(path);
  return base64;
}

export function isMongoId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}