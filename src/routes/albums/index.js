import express from 'express';
import mongoose from 'mongoose';

import { isMongoId } from '../../modules/utils';
import Album from '../../schemas/Album';
import User from '../../schemas/User';

const router = express.Router();

router
  .post('/:albumId/delete', async (req, res) => {
    const user = await User.findById(req.query.userId);
    user.albums = user.albums.filter(a => a.id !== req.params.albumId);
    await user.save();

    res.redirect(`/albums?userId=${req.query.userId}`)
  })

  .post('/:albumId/:imgId/delete', async (req, res) => {
    const albumId = req.params.albumId;
    const userId = req.query.userId;
    const imgId = req.params.imgUd;
    const user = await User.findById(userId);
    const album = user.albums.find(a => a.id === albumId);

    if(!user || !album) {
      return res.redirect(`/albums?id=${albumId}`);
    }

    album.photos = albums.photos.filter(p => p.id !== imgId);
    await user.save();

    res.redirect(`/albums?id=${albumId}`);
  })

  .get('/', async (req, res) => {
    if(!req.query.userId || !isMongoId(req.query.userId)) {
      return res.redirect('/');
    }

    const user = await User.findById(req.query.userId);
    if(user) {
      res.render('albums/index', { pageTitle: 'Albums', albums: user.albums, userId: user._id });
    } else {
      res.redirect('/');
    }
  })

  .get('/:id', async (req, res) => {
    const user = await User.findById(req.query.userId);
    const album = user.albums.find(a => a.id === req.params.id);
    res.render('albums/album', { pageTitle: album.name, album, userId: req.query.userId });
  });

export default router;