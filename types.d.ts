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