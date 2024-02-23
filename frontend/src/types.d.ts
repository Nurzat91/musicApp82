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