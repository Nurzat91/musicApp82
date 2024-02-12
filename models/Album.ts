import {Schema, model} from 'mongoose';


const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  info: String,
});

const Album = model('Album', AlbumSchema);

export default Album;