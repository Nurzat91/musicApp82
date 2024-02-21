import express from 'express';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import auth, {RequestWithUser} from '../middleware/auth';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth,  async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const trackData = {
      user_id: user,
      track_id: req.body.track_id,
    };

    const track = new TrackHistory(trackData);
    await track.save();

    res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});
export default trackHistoryRouter;