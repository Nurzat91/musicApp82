import {Router} from 'express';
import mongoose from 'mongoose';

import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import {ArtistProps} from '../types';

const artistRouter = Router();


artistRouter.get('/', async (_req, res, next) => {
  try {
    const results = await Artist.find();


    res.send(results);
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
export default artistRouter;