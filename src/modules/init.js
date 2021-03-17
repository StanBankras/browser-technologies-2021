import fs from 'fs';
import path from 'path';

export default function() {
  const file = path.join(__dirname, '..', 'data', 'data.json');

  if(!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({
      users: [],
      albums: []
    }));
  }
}