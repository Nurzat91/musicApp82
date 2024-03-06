export interface Artists{
  _id: string;
  name: string;
  info: string;
  image: string | null;
}
export interface Albums{
  _id: string;
  title: string;
  year: number;
  image: string | null;
}

export interface Tracks{
  _id: string;
  name: string;
  duration: string;
  tracksNumber: number;
}

export interface RegisterMutation {
  username: string;
  displayName: string;
  password: string;
}
export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  token: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistory{
  _id: string;
  user: string;
  track: Tracks;
  artist: Artists;
  datetime: string;
}
export interface HistoryMutation {
  track: string;
}