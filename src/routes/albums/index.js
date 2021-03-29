import express from 'express';
import mongoose from 'mongoose';
import { editAlbum, modifiyImageOrder, updateAlbum } from '../../controllers/album';
import { deleteImage, uploadImage } from '../../controllers/image';

import { isMongoId } from '../../modules/utils';
import Album from '../../schemas/Album';
import User from '../../schemas/User';
import { upload } from '../../modules/multer';

const router = express.Router();

router
  .post('/img', upload.single('image'), (req, res) => uploadImage(req, res, '/albums/%ALBUM_ID%/upload?userId=%USER_ID%'))
  .post('/:step', (req, res) => updateAlbum(req, res, `/albums/%ALBUM_ID%?userId=%USER_ID%`, req.params.step))
  .post('/:albumId/:imgId/delete', (req, res) => deleteImage(req, res, '/albums/%ALBUM_ID%/upload/?userId=%USER_ID%'))
  .post('/:albumId/:imgId/order/:direction', (req, res) => modifiyImageOrder(req, res, '/albums/%ALBUM_ID%/sort?userId=%USER_ID%'))
  .post('/:albumId/delete', async (req, res) => {
    const user = await User.findById(req.query.userId);
    user.albums = user.albums.filter(a => a.id !== req.params.albumId);
    await user.save();

    res.redirect(`/albums?userId=${req.query.userId}`)
  })

  .get('/:id/carousel', async (req, res) => {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    const album = user.albums.find(a => a.id === req.params.id);
    
    res.render('albums/carousel', { userId, album, pageTitle: album.name ? album.name : 'Album carousel' });
  })

  .get('/:id/photos/:imgId', async (req, res) => {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    const album = user.albums.find(a => a.id === req.params.id);
    const image = album.photos.find(p => p.id === req.params.imgId);
    
    res.render('albums/photo-detail', { image, userId, album, pageTitle: image.name ? image.name : 'Photo detail page' });
  })

  .get('/:id/:step', (req, res, next) => {
    if(req.params.id === 'new') return next();
    editAlbum(req, res, 'albums/%STEP%')
  })

  .get('/', async (req, res) => {
    if(!req.query.userId || !isMongoId(req.query.userId)) {
      return res.redirect('/');
    }

    const user = await User.findById(req.query.userId);
    if(user) {
      user.albums = user.albums.filter(a => a.name !== '' && a.photos.length !== 0);
      await user.save();
      
      res.render('albums/index', { pageTitle: 'Albums', albums: user.albums, userId: user._id });
    } else {
      res.redirect('/');
    }
  })

  .get('/:id', async (req, res) => {
    const user = await User.findById(req.query.userId);
    const album = user.albums.find(a => a.id === req.params.id);
    res.render('albums/album', { pageTitle: album.name || 'Photo album', album, userId: req.query.userId });
  });

export default router;