import {Schema, model, Types} from 'mongoose';
import User from './User';
import Track from './Track';
import Artist from './Artist';

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) =>{
        const user_id = await User.findById(value);
        return Boolean(user_id);
      },
      message: 'Album does not exist!',
    }
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) =>{
        const track_id = await Track.findById(value);
        return Boolean(track_id);
      },
      message: 'Album does not exist!',
    }
  },
  datetime: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    validate: {
      validator: async (value: Types.ObjectId) => Artist.findById(value),
      message: 'Artist was not found'
    }
  }
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);

export default TrackHistory;