require('dotenv').config();
import express from 'express';
import path from 'path';
import shortid from 'shortid';
import mongoose, { Schema } from 'mongoose';

import { upload } from './modules/multer';
import User from './schemas/User';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'src', 'views'));
app.use(express.static(path.join(__dirname, '..', 'src', 'public')));

(async function() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  
    const user = new User({
      name: 'Stan',
      albums: ['test', 'test']
    });
  
    console.log(user);
  
    app.get('/', (req, res) => {
      const userId = shortid.generate();
    
      res.render('albums', { pageTitle: 'Albums', userId });
    });
    
    app.get('/new', (req, res) => {
      res.render('albums');
    });
    
    app.post('/img', upload.single('image'), (req, res) => {
      console.log(req.file);
      res.redirect('/');
    })
    
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch(err) {
    console.error(err);
  }
})();