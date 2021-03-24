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
  const order = album.photos.length > 0 ? album.photos.sort((a, b) => b.order - a.order)[0].order : 0;

  if(!albumId || !userId || !user || !album || !req.file) {
    return res.redirect(`/albums/new/upload?id=${albumId}&userId=${userId}`);
  }

  const base64 = getBase64FromPath(req.file.path);
  const photo = {
    id: shortid.generate(),
    order: order + 1,
    base64,
    name: req.body.name,
    alt: req.body.alt,
    description: req.body.description,
    author: req.body.author,
    location: req.body.location
  }
  
  album.photos = [...album.photos, photo];
  await user.save();

  res.redirect(`/albums/new/upload?id=${albumId}&userId=${userId}`);
});

router.post('/:albumId/:imgId/delete', async (req, res) => {
  const albumId = req.params.albumId;
  const userId = req.query.userId;
  const imgId = req.params.imgId;
  const user = await User.findById(userId);

  if(!albumId || !userId || !user || !imgId) {
    return res.redirect(`/albums/new/upload?id=${albumId}&userId=${userId}`);
  }
  
  const album = user.albums.find(a => a.id === albumId);
  album.photos = album.photos.filter(p => p.id !== imgId);
  const sortedPhotos = album.photos.sort((a, b) => a.order - b.order);
  const newPhotos = [];
  
  for(let i = 0; i < sortedPhotos.length; i++) {
    const photo = sortedPhotos[i];
    photo.order = i;
    newPhotos.push(photo);
  }

  album.photos = newPhotos;

  await user.save();

  res.redirect(`/albums/new/upload?id=${albumId}&userId=${userId}`);
});

router.post('/:albumId/:imgId/order/:direction', async (req, res) => {
  const albumId = req.params.albumId;
  const userId = req.query.userId;
  const imgId = req.params.imgId;
  const user = await User.findById(userId);
  const album = user.albums.find(a => a.id === albumId);
  const photo = album.photos.find(p => p.id === imgId);

  if(!albumId || !userId || !user || !imgId || !album || !photo || !['up', 'down'].includes(req.params.direction)) {
    return res.redirect(`/albums/new/sort?id=${albumId}&userId=${userId}`);
  }

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

  res.redirect(`/albums/new/sort?id=${albumId}&userId=${userId}`);
});

router.post('/:step?', async (req, res) => {
  if(!req.query.userId || !isMongoId(req.query.userId)) {
    return res.redirect('/');
  }
  const user = await User.findById(req.query.userId);

  if(req.params.step) {
    if(req.params.step === 'details') {
      const album = user.albums.find(a => a.id === req.query.id);
      album.name = req.body.name;
      album.description = req.body.description;
      await user.save();
      
      return res.redirect(`/albums/new/upload?userId=${req.query.userId}&id=${req.query.id}`);
    }
    if(req.params.step === 'upload') {
      return res.redirect(`/albums/new/sort?userId=${req.query.userId}&id=${req.query.id}`);
    }
  }

  const album = {
    id: shortid.generate(),
    name: req.body.name || '',
    description: req.body.description || '', 
    photos: []
  };

  user.albums = [...user.albums, album];
  await user.save();

  res.redirect(`/albums/new/details?userId=${req.query.userId}&id=${album.id}`);
});

router.get('/:step', async (req, res) => {
  const step = req.params.step;
  if(!['details', 'upload', 'sort'].includes(step)) {
    return res.redirect('/');
  }

  const user = await User.findById(req.query.userId);
  const album = user.albums.find(a => a.id === req.query.id);

  res.render(`albums/new/${step}`, { pageTitle: `${step}: ${album.name}`, album, userId: user._id });
});

export default router;

