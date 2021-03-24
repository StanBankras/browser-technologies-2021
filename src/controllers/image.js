import shortid from 'shortid';

import { getBase64FromPath } from "../modules/utils";
import User from "../schemas/User";

export async function uploadImage(req, res, redirectUrl) {
  const albumId = req.query.albumId;
  const userId = req.query.userId;
  const user = await User.findById(userId);
  const album = user.albums.find(a => a.id === albumId);
  const order = album.photos.length > 0 ? album.photos.sort((a, b) => b.order - a.order)[0].order : 0;
  const url = redirectUrl.replace('%ALBUM_ID%', albumId).replace('%USER_ID%', userId);

  if(!albumId || !userId || !user || !album || !req.file) {
    return res.redirect(url);
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

  res.redirect(url);
}

export async function deleteImage(req, res, redirectUrl) {
  const albumId = req.params.albumId;
  const userId = req.query.userId;
  const imgId = req.params.imgId;
  const user = await User.findById(userId);
  const url = redirectUrl.replace('%ALBUM_ID%', albumId).replace('%USER_ID%', userId);

  if(!albumId || !userId || !user || !imgId) {
    return res.redirect(url);
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

  res.redirect(url);
}