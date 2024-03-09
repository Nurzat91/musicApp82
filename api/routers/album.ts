import {Router} from 'express';
import mongoose, {Types} from 'mongoose';

import Album from '../models/Album';
import {imagesUpload} from '../multer';
import auth, {RequestWithUser} from '../middleware/auth';
import role from '../middleware/role';
import permit from '../middleware/permit';
import artistRouter from './artist';

const albumRouter = Router();

albumRouter.get('/', role, async (req, res, next) => {
  try {
    let query = {};
    if (req.query.artist) {
      query = {artist: req.query.artist};
    }

    const results = await Album.find(query).populate('artist', 'name');

    res.send(results);


  } catch (e) {
    return next(e);
  }
});

albumRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({error: 'Wrong ObjectId!'});
    }

    const album = await Album.findById({_id}).sort({ year: -1 });

    if (!album) {
      return res.status(404).send({error: 'Not found!'});
    }

    res.send(album);
  } catch (e) {
    next(e);
  }
});

albumRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const albumData = {
      artist: req.body.artist,
      title: req.body.title,
      year: req.body.year,
      image: req.file ? req.file.filename : null,
    };

    const album = new Album(albumData);
    await album.save();

    res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

albumRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req, res, next) =>{
    try {
      let _id: Types.ObjectId;
      try {
        _id = new Types.ObjectId(req.params.id);
      } catch {
        return res.status(404).send({error: 'Wrong ObjectId!'});
      }

      const remove = await Album.findOneAndDelete({_id});

      if (!remove) {
        return res.status(404).send({error: 'Not found!'});
      }

      res.send(remove);
    } catch (e) {
      next(e);
    }
  }
);

albumRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res, next) =>{
    try {
      let _id: Types.ObjectId;
      try {
        _id = new Types.ObjectId(req.params.id);
      } catch {
        return res.status(404).send({error: 'Wrong ObjectId!'});
      }

      const create = await Album.findById({_id});

      if (!create) {
        return res.status(404).send({error: 'Not found!'});
      }

      res.send(create);
    } catch (e) {
      next(e);
    }
  }
);
export default albumRouter;