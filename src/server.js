require('dotenv').config();
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose, { Schema } from 'mongoose';

import { upload } from './modules/multer';
import { getBase64FromPath } from './modules/utils';
import Photo from './schemas/Photo';
import User from './schemas/User';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'src', 'views'));
app.use(express.static(path.join(__dirname, '..', 'src', 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

(async function() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  
    app.get('/', (req, res) => {
      res.render('albums', { pageTitle: 'Albums' });
    });
    
    app.get('/new', (req, res) => {
      res.render('albums');
    });

    app.post('/create-user', async (req, res) => {
      const user = new User();
      user.name = req.body.name ? req.body.name : undefined;
      await user.save();

      res.render('id', { userId: user._id, pageTitle: 'Title' })
    });
    
    app.post('/img', upload.single('image'), (req, res) => {
      const base64 = getBase64FromPath(req.file.path);
      console.log(base64);
      res.redirect('/');
    });
    
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch(err) {
    console.error(err);
  }
})();