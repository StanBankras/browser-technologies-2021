import express from 'express';
import mongoose from 'mongoose';

import { isMongoId } from '../../modules/utils';
import Album from '../../schemas/Album';
import User from '../../schemas/User';

const router = express.Router();

router.get('/', async (req, res) => {
  if(!req.query.userId || !isMongoId(req.query.userId)) {
    return res.redirect('/');
  }

  const user = await User.findById(req.query.userId);
  if(user) {
    res.render('albums/index', { pageTitle: 'Albums', albums: user.albums, userId: user._id });
  } else {
    res.redirect('/');
  }
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.query.userId);
  const album = user.albums.find(a => a.id === req.params.id);
  res.render('albums/album', { pageTitle: album.name, album, userId: req.query.userId });
});

router.post('/:id/delete', async (req, res) => {
  const user = await User.findById(req.query.userId);
  user.albums = user.albums.filter(a => a.id !== req.params.id);
  console.log(req.params.id, user.albums.map(a => a.id));
  await user.save();

  res.redirect(`/albums?userId=${req.query.userId}`)
});

router.post('/:albumId/:imgId/delete', (req, res) => {

});

export default router;