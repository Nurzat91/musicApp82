import express from 'express';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import auth, {RequestWithUser} from '../middleware/auth';
import Track from '../models/Track';
import Album from '../models/Album';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth,  async (req, res, next) => {
    try {
      const user = (req as RequestWithUser).user;
      const track = await Track.findById(req.body.track);
      const album = await Album.findById(track?.album);

    const trackData = {
      user: user?._id,
      track: req.body.track,
      artist: album?.artist,
      datetime: Date.now(),
    };

    const trackHistory  = new TrackHistory(trackData);
    await trackHistory.save();

    res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});
trackHistoryRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const tracksHistory = await TrackHistory.find({ user: user?._id }).populate('user').populate('artist').populate('track').sort({datetime: -1});

    return res.send(tracksHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      next(e);
    }
  }
});
export default trackHistoryRouter;