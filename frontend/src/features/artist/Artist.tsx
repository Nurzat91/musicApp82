import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { fetchArtists } from './artistThunks';
import { selectArtists, selectLoading } from './artistSlice';
import { CircularProgress, Grid } from '@mui/material';
import ArtistItem from './components/ArtistItem';
import { selectUser } from '../users/usersSlice';


const Artist = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  return (
    <Grid container spacing={2}>
      {loading ? <CircularProgress/>: artists.map((artist) => {
        if(user && user.role === 'admin'){
          return (
            <ArtistItem
              key={artist._id}
              id={artist._id}
              name={artist.name}
              info={artist.info}
              image={artist.image}
              isPublished={artist.isPublished}
            />
          )
        }else if(artist.isPublished === true) {
          return (
            <ArtistItem
              key={artist._id}
              id={artist._id}
              name={artist.name}
              info={artist.info}
              image={artist.image}
              isPublished={artist.isPublished}
            />
          )
        }
      })}
    </Grid>
  );
};

export default Artist;