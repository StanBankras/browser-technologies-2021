import express from 'express';
import mongoose from 'mongoose';

import { isMongoId } from '../../modules/utils';
import Album from '../../schemas/Album';
import User from '../../schemas/User';

const router = express.Router();

router.get('/', async (req, res) => {
  if(!req.query.id || !isMongoId(req.query.id)) {
    return res.redirect('/');
  }

  const user = await User.findById(req.query.id);
  if(user) {
    const albums = await Promise.all(user.albums.map(async album => await Album.findById(album._id)));
    res.render('albums/index', { pageTitle: 'Albums', albums, userId: user._id });
  } else {
    res.redirect('/');
  }
});

router.get('/:id', async (req, res) => {
  const album = await Album.findById(req.params.id);
  res.render('albums/album', { pageTitle: album.name, album, userId: req.query.userId });
});

router.post('/:id/delete', async (req, res) => {
  const album = await Album.findByIdAndDelete(req.params.id);
  const user = await User.findOne({ albums: mongoose.Types.ObjectId(req.params.id) });
  user.albums = user.albums.filter(a => a.toString() !== req.params.id);
  await user.save();

  res.redirect(`/albums?id=${req.query.userId}`)
});

export default router;