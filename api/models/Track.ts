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
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Album does not exist!',
    }
  },
  tracksNumber: {
    type: Number,
    required: true,
  },
});


const Track = model('Track', TrackSchema);

export default Track;