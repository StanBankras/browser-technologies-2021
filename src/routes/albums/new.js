import express from 'express';
import shortid from 'shortid';

import { upload } from '../../modules/multer';
import { isMongoId, getBase64FromPath } from '../../modules/utils';
import User from '../../schemas/User';

const router = express.Router();

router.post('/img', upload.single('image'), async (req, res) => {
  const albumId = req.query.albumId;
  const userId = req.query.userId;

  const base64 = getBase64FromPath(req.file.path);
  const photo = {
    id: shortid.generate(),
    base64,
    alt: req.body.altundefined,
    description: req.body.description,
    author: req.body.author,
    location: req.body.location
  }
  
  const user = await User.findById(userId);
  const album = user.albums.find(a => a.id === albumId);
  album.photos = [...album.photos, photo];
  await user.save();

  res.redirect(`/albums/new/2?id=${albumId}&userId=${userId}`);
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

