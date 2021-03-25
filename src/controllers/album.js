import { isMongoId } from "../modules/utils";
import User from "../schemas/User";

export async function modifiyImageOrder(req, res, redirectUrl) {
  const albumId = req.params.albumId;
  const userId = req.query.userId || req.body.userId;
  const imgId = req.params.imgId;
  const user = await User.findById(userId);
  const album = user.albums.find(a => a.id === albumId);
  const photo = album.photos.find(p => p.id === imgId);
  const url = redirectUrl.replace('%ALBUM_ID%', albumId).replace('%USER_ID%', userId);

  if(!albumId || !userId || !user || !imgId || !album || !photo || !['up', 'down'].includes(req.params.direction)) {
    return res.redirect(url);
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

  res.redirect(url);
}

export async function editAlbum(req, res, redirectUrl, create) {
  const step = req.params.step;
  if(!['details', 'upload', 'sort'].includes(step)) {
    return res.redirect('/');
  }

  const user = await User.findById(req.query.userId || req.body.userId);
  const album = user.albums.find(a => a.id === (req.query.id || req.params.id));
  const url = redirectUrl.replace('%STEP%', step);

  res.render(url, { 
    pageTitle: `${step}: ${album.name}`,
    album,
    userId: user._id, error: req.query.error ? req.query.error : false,
    create 
  });
}

export async function updateAlbum(req, res, redirectUrl, type) {
  if(!req.query.userId || !isMongoId(req.query.userId)) {
    return res.redirect('/');
  }

  const userId = req.query.userId || req.body.userId;
  const user = await User.findById(userId);
  const album = user.albums.find(a => a.id === req.query.id);
  const url = redirectUrl.replace('%ALBUM_ID%', album.id).replace('%USER_ID%', req.query.userId);

  if(type === 'details') {
    const album = user.albums.find(a => a.id === req.query.id);
    if(!req.body.name) return res.redirect(url.replace('upload', 'details') + '&error=name');
    album.name = req.body.name;
    album.description = req.body.description;
    await user.save();
    
    return res.redirect(url);
  }
  if(type === 'upload') {
    return res.redirect(url);
  }
}