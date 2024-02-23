import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CircularProgress, Grid } from '@mui/material';
import { selectAlbums, selectLoading } from './albumSlice';
import AlbumsItem from './components/AlbumsItem';
import { fetchAlbum} from './albumThunks';

const Album = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchAlbum());
  }, [dispatch]);
  return (
    <Grid container spacing={2}>
      {loading ? <CircularProgress/>: albums.map((album) => (
        <AlbumsItem
          key={album._id}
          id={album._id}
          title={album.title}
          year={album.year}
          image={album.image}
        />
      ))}
    </Grid>
  );
};

export default Album;