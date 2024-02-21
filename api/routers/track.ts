import {Router} from 'express';
import mongoose, {Types} from 'mongoose';

import Track from '../models/Track';
import {TracksProps} from '../types';

const trackRouter = Router();

trackRouter.get('/', async (req, res, next) => {
  try {
    let query = {};
    if (req.query.album) {
      query = {album: req.query.album};
    }

    const results = await Track.find(query).populate('album', 'title');


    res.send(results);
  } catch (e) {
    return next(e);
  }
});

trackRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({error: 'Wrong ObjectId!'});
    }

    const track = await Track.findById({_id});

    if (!track) {
      return res.status(404).send({error: 'Not found!'});
    }

    res.send(track);
  } catch (e) {
    next(e);
  }
});

trackRouter.post('/',   async (req, res, next) => {
  try {
    const trackData: TracksProps = {
      album: req.body.album,
      name: req.body.name,
      duration: req.body.duration,
      tracksNumber: req.body.tracksNumber,
    };

    const track = new Track(trackData);
    await track.save();

    res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});
export default trackRouter;