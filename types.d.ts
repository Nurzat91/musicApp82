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