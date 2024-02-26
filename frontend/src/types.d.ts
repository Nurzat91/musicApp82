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
export type ApiAlbums = Omit<Albums, 'id'>;

export interface Tracks{
  _id: string;
  name: string;
  duration: string;
  tracksNumber: number;
}

export interface RegisterMutation {
  username: string;
  password: string;
}
export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
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