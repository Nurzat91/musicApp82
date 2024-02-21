import {Schema, model, Types} from 'mongoose';
import User from './User';
import Track from './Track';

const TrackHistorySchema = new Schema({
  user_id: {
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
  track_id: {
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
    default: () => new Date(),
  },
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);

export default TrackHistory;