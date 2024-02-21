import {Model} from 'mongoose';

export interface ArtistProps{
  name: string;
  info: string,
  image: string | null,
}

export interface AlbumProps{
  artist: string;
  title: string;
  year: number;
  image: string | null,
}

export interface TracksProps{
  name: string;
  duration: string;
  album: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

interface UserMethods{
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

export interface TrackHistoryProps  {
  user_id: string;
  track_id: string;
}