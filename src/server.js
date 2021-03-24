require('dotenv').config();
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

import albumRoutes from './routes/albums/index';
import newAlbumRoutes from './routes/albums/new';
import authRoutes from './routes/auth';
import photoRoutes from './routes/photos/index';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

(async function() {
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  app
    .use('/photos', photoRoutes)
    .use('/albums', albumRoutes)
    .use('/albums/new', newAlbumRoutes)
    .use('/', authRoutes)
    .listen(port, () => console.info(`server is running on port ${port}`));
})();