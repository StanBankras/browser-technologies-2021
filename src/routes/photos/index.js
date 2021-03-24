import express from 'express';
import mongoose from 'mongoose';

import { isMongoId } from '../../modules/utils';
import User from '../../schemas/User';

const router = express.Router();

router.get('/', async (req, res) => {
  const userId = req.query.userId;
  if(!userId || !isMongoId(userId)) {
    return res.redirect('/');
  }

  const user = await User.findById(userId);
  let photos = user.albums.map(a => a.photos.map(p => p.base64)).flat();

  res.render('photos', { pageTitle: 'Your photos', photos, userId })
});

export default router;