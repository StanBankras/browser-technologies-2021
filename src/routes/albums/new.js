import express from 'express';
import shortid from 'shortid';
import { editAlbum, modifiyImageOrder, updateAlbum } from '../../controllers/album';
import { deleteImage, uploadImage } from '../../controllers/image';

import { upload } from '../../modules/multer';
import { isMongoId, getBase64FromPath } from '../../modules/utils';
import User from '../../schemas/User';

const router = express.Router();

router
  .post('/img', upload.single('image'), (req, res) => uploadImage(req, res, '/albums/new/upload?id=%ALBUM_ID%&userId=%USER_ID%'))
  .post('/:albumId/:imgId/delete', (req, res) => deleteImage(req, res, '/albums/new/upload?id=%ALBUM_ID%&userId=%USER_ID%'))
  .post('/:albumId/:imgId/order/:direction', (req, res) => modifiyImageOrder(req, res, '/albums/new/sort?id=%ALBUM_ID%&userId=%USER_ID%'))
  .post('/create', async (req, res) => {
    if(!req.query.userId || !isMongoId(req.query.userId)) {
      return res.redirect('/');
    }
    
    const user = await User.findById(req.query.userId);
    const album = {
      id: shortid.generate(),
      name: req.body.name || '',
      description: req.body.description || '', 
      photos: []
    };

    user.albums = [...user.albums, album];
    await user.save();

    res.redirect(`/albums/new/details?userId=${req.query.userId}&id=${album.id}`);
  })
  .post('/:step', async (req, res) => updateAlbum(req, res, `/albums/new/${req.params.step === 'details' ? 'upload' : 'sort'}?userId=%USER_ID%&id=%ALBUM_ID%`, req.params.step))
  .get('/:step', (req, res) => editAlbum(req, res, 'albums/%STEP%', true));

export default router;

