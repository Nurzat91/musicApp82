import {Router} from 'express';
import mongoose, {Types} from 'mongoose';

import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import {ArtistProps} from '../types';
import auth, {RequestWithUser} from '../middleware/auth';
import role from '../middleware/role';
import permit from '../middleware/permit';

const artistRouter = Router();


artistRouter.get('/', role, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    if(user && user.role === 'admin'){
      const results = await Artist.find({isPublished: true});
      res.send(results);
    }else {
      const results = await Artist.find();
      res.send(results);
    }
  } catch (e) {
    return next(e);
  }
});

artistRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const artistData: ArtistProps = {
      name: req.body.name,
      info: req.body.info,
      image: req.file ? req.file.filename : null,
    };

    const artist = new Artist(artistData);
    await artist.save();

    res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

artistRouter.delete(
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

      const remove = await Artist.findOneAndDelete({_id});

      if (!remove) {
        return res.status(404).send({error: 'Not found!'});
      }

      res.send(remove);
    } catch (e) {
      next(e);
    }
  }
);

artistRouter.patch(
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

      const create = await Artist.findById({_id});

      if (!create) {
        return res.status(404).send({error: 'Not found!'});
      }

      res.send(create);
    } catch (e) {
      next(e);
    }
  }
);
export default artistRouter;