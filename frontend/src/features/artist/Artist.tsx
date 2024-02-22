import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, { useEffect } from 'react';
import { fetchArtists } from './artistThunks';
import { selectArtists } from './artistSlice';
import { Grid } from '@mui/material';
import { Artists } from '../../types';
import ArtistItem from './components/ArtistItem';


const Artist: React.FC<Artists> = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  return (
    <Grid container spacing={2}>
      {artists.map((artist) => (
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