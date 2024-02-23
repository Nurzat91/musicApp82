import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { fetchArtists } from './artistThunks';
import { selectArtists, selectLoading } from './artistSlice';
import { CircularProgress, Grid } from '@mui/material';
import ArtistItem from './components/ArtistItem';


const Artist = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  return (
    <Grid container spacing={2}>
      {loading ? <CircularProgress/>: artists.map((artist) => (
        <ArtistItem
          key={artist._id}
          id={artist._id}
          name={artist.name}
          info={artist.info}
          image={artist.image}
        />
      ))}
    </Grid>
  );
};

export default Artist;