require('dotenv').config();
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

import User from './schemas/User';
import Album from './schemas/Album';

import albumRoutes from './routes/albums/index';
import newAlbumRoutes from './routes/albums/new';
import authRoutes from './routes/auth';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'src', 'views'));
app.use(express.static(path.join(__dirname, '..', 'src', 'public')));
app.use(express.urlencoded({ extended: false }));

(async function() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    app
      .use('/albums', albumRoutes)
      .use('/albums/new', newAlbumRoutes)
      .use('/', authRoutes)
      .get('/', (req, res) => res.render('login', { pageTitle: 'Login' }))
      .listen(port, () => console.info(`server is running on port ${port}`));
      
  } catch(err) {
    console.error(err);
  }
})();