import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CircularProgress, Grid } from '@mui/material';
import { selectAlbums, selectLoading } from './albumSlice';
import AlbumsItem from './components/AlbumsItem';
import { fetchAlbum} from './albumThunks';
import { useParams } from 'react-router-dom';

const Album = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchAlbum(id));
  }, [dispatch, id]);
  return (
    <Grid container spacing={2}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {albums.map((album) => (
            <AlbumsItem
              key={album._id}
              id={album._id}
              title={album.title}
              year={album.year}
              image={album.image}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default Album;