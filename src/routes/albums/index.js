import express from 'express';

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
    res.render('albums', { pageTitle: 'Albums', albums, userId: user._id });
  } else {
    res.redirect('/');
  }
});

export default router;