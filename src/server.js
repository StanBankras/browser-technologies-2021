require('dotenv').config();
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import url from 'url';
import mongoose from 'mongoose';

import { upload } from './modules/multer';
import { getBase64FromPath, isMongoId } from './modules/utils';
import Photo from './schemas/Photo';
import User from './schemas/User';
import Album from './schemas/Album';

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
      res.render('login', { pageTitle: 'Login' });
    });

    app.get('/albums', async (req, res) => {
      if(!req.query.id || !mongoose.Types.ObjectId.isValid(req.query.id)) {
        return res.redirect('/');
      }

      const user = await User.findById(req.query.id);
      if(user) {
        const albums = await Promise.all(user.albums.map(async album => await Album.findById(album._id)));
        res.render('albums', { pageTitle: 'Albums', albums, userId: user._id });
      } else {
        res.redirect('/');
      }
    });

    app.post('/album/new', async (req, res) => {
      if(!req.query.userId || !isMongoId(req.query.userId)) {
        return res.render('login');
      }

      const user = await User.findById(req.query.userId);
      const album = new Album({
        name: req.body.name,
        description: req.body.description, 
        photoIds: []
      });

      await album.save();
      user.set('albums', [...user.albums, album._id]);
      await user.save();

      res.redirect(`/album?id=${album._id}`);
    });

    app.get('/album', async (req, res) => {
      const album = await Album.findById(req.query.id);
      res.render('album', { pageTitle: album.name, album });
    })

    app.post('/login', async (req, res) => {
      if(!req.body.id || !isMongoId(req.body.id)) {
        return res.redirect('/');
      }

      const user = await User.findById(req.body.id);
      if(user) {
        res.redirect(`/albums?id=${user._id.toString()}`);
      } else {
        res.redirect('/');
      }
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