import {Schema, model, Types} from 'mongoose';
import Album from './Album';


const TrackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  duration: String,
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) =>{
        const track = await Album.findById(value);
        return Boolean(track);
      },
      message: 'Album does not exist!',
    }
  },
  tracksNumber: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});


const Track = model('Track', TrackSchema);

export default Track;