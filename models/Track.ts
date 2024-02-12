import {Schema, model} from 'mongoose';


const TrackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  info: String,
});

const Track = model('Track', TrackSchema);

export default Track;