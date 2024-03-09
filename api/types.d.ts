import {Model} from 'mongoose';

export interface ArtistProps{
  name: string;
  info: string,
  image: string | null,
}


export interface TracksProps{
  name: string;
  duration: string;
  album: string;
  tracksNumber: number;
}

export interface UserFields {
  username: string;
  displayName: string;
  password: string;
  token: string;
  role: string;
}

interface UserMethods{
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

