import express from 'express';
import shortid from 'shortid';

import { upload } from '../../modules/multer';
import { isMongoId, getBase64FromPath } from '../../modules/utils';
import User from '../../schemas/User';

const router = express.Router();

router.post('/img', upload.single('image'), async (req, res) => {
  const albumId = req.query.albumId;
  const userId = req.query.userId;
  const user = await User.findById(userId);
  const album = user.albums.find(a => a.id === albumId);
  const order = album.photos.length > 0 ? album.photos.sort((a, b) => b.order - a.order)[0].order + 1 : 0;

  const base64 = getBase64FromPath(req.file.path);
  const photo = {
    id: shortid.generate(),
    order,
    base64,
    alt: req.body.altundefined,
    description: req.body.description,
    author: req.body.author,
    location: req.body.location
  }
  
  album.photos = [...album.photos, photo];
  await user.save();

  res.redirect(`/albums/new/2?id=${albumId}&userId=${userId}`);
});

router.post('/:albumId/:imgId/delete', async (req, res) => {
  const albumId = req.params.albumId;
  const userId = req.query.userId;
  const imgId = req.params.imgId;
  const user = await User.findById(userId);
  const album = user.albums.find(a => a.id === albumId);
  album.photos = album.photos.filter(p => p.id !== imgId);
  await user.save();

  res.redirect(`/albums/new/2?id=${albumId}&userId=${userId}`);
});

router.post('/:albumId/:imgId/order/:direction', async (req, res) => {
  const albumId = req.params.albumId;
  const userId = req.query.userId;
  const imgId = req.params.imgId;
  const user = await User.findById(userId);
  const album = user.albums.find(a => a.id === albumId);
  const photo = album.photos.find(p => p.id === imgId);

  if(req.params.direction === 'down') {
    const prevPhoto = album.photos.find(p => p.order === photo.order + 1);
    if(prevPhoto) {
      photo.order += 1;
      prevPhoto.order -= 1;
      await user.save();
    }
  } else {
    const nextPhoto = album.photos.find(p => p.order === photo.order - 1);
    if(nextPhoto) {
      photo.order -= 1;
      nextPhoto.order += 1;
      await user.save();
    }
  }

  res.redirect(`/albums/new/3?id=${albumId}&userId=${userId}`);
});

router.post('/:step?', async (req, res) => {
  const user = await User.findById(req.query.userId);

  if(req.params.step) {
    if(req.params.step === '1') {
      const album = user.albums.find(a => a.id === req.query.id);
      album.name = req.body.name;
      album.description = req.body.description;
      await user.save();
      
      return res.redirect(`/albums/new/2?userId=${req.query.userId}&id=${req.query.id}`);
    }
    if(req.params.step === '2') {
      return res.redirect(`/albums/new/3?userId=${req.query.userId}&id=${req.query.id}`);
    }
  }

  if(!req.query.userId || !isMongoId(req.query.userId)) {
    return res.redirect('/');
  }

  const album = {
    id: shortid.generate(),
    name: req.body.name || '',
    description: req.body.description || '', 
    photos: []
  };

  user.albums = [...user.albums, album];
  await user.save();

  res.redirect(`/albums/new/1?userId=${req.query.userId}&id=${album.id}`);
});

router.get('/:step', async (req, res) => {
  const step = req.params.step;
  if(!['1', '2', '3'].includes(step)) {
    return res.redirect('/');
  }

  const user = await User.findById(req.query.userId);
  const album = user.albums.find(a => a.id === req.query.id);

  res.render(`albums/new/step${step}`, { pageTitle: `Step ${step}: ${album.name}`, album, userId: user._id });
});

export default router;

