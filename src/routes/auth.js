import express from 'express';

import { isMongoId } from '../modules/utils';

import User from '../schemas/User';

const router = express.Router();

router.post('/login', async (req, res) => {
  if(!req.body.id || !isMongoId(req.body.id)) {
    return res.redirect('/');
  }

  const user = await User.findById(req.body.id);
  if(user) {
    res.redirect(`/albums?id=${user._id.toString()}`);
  } else {
    res.redirect('/');
  }
});

router.post('/create-user', async (req, res) => {
  const user = new User();
  user.name = req.body.name ? req.body.name : undefined;
  await user.save();

  res.render('id', { userId: user._id, pageTitle: 'Title' })
});

export default router;