import express from 'express';

import { upload } from '../../modules/multer';
import { isMongoId, getBase64FromPath } from '../../modules/utils';
import Album from '../../schemas/Album';
import User from '../../schemas/User';

const router = express.Router();

router.post('/img', upload.single('image'), async (req, res) => {
  const albumId = req.query.albumId;
  if(!albumId || !isMongoId(albumId)) {
    return res.render(`/albums/new/2?id=${albumId}`);
  }

  const base64 = getBase64FromPath(req.file.path);
  const photo = {
    base64,
    alt: req.body.altundefined,
    description: req.body.description,
    author: req.body.author,
    location: req.body.location
  }
  
  const album = await Album.findById(albumId);
  album.photos = [...album.photos, photo];
  await album.save();

  res.redirect(`/albums/new/2?id=${albumId}`);
});

router.post('/:step?', async (req, res) => {
  if(req.params.step) {
    if(req.params.step === '1') {
      const album = await Album.findById(req.query.id);
      album.name = req.body.name;
      album.description = req.body.description;

      await album.save();
      return res.redirect(`/albums/new/2?id=${req.query.id}`);
    }
    if(req.params.step === '2') {
      return res.redirect(`/albums/new/3?id=${req.query.id}`);
    }
  }

  if(!req.query.userId || !isMongoId(req.query.userId)) {
    return res.redirect('/');
  }

  const user = await User.findById(req.query.userId);
  const album = new Album({
    name: req.body.name,
    description: req.body.description, 
    photos: []
  });

  await album.save();
  user.set('albums', [...user.albums, album._id]);
  await user.save();

  res.redirect(`/albums/new/1?id=${album._id}`);
});

router.get('/:step', async (req, res) => {
  const step = req.params.step;
  if(!['1', '2', '3'].includes(step)) {
    return res.redirect('/');
  }

  const album = await Album.findById(req.query.id);

  res.render(`step${step}`, { pageTitle: `Step ${step}: ${album.name}`, album });
});

export default router;

