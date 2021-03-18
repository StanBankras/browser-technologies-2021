import fs from 'fs';

export function getBase64FromPath(path) {
  const base64 = new Buffer.from(fs.readFileSync(path)).toString('base64');
  fs.unlinkSync(path);
  return base64;
}