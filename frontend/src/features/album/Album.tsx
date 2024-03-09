import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CircularProgress, Grid } from '@mui/material';
import { selectAlbums, selectLoading } from './albumSlice';
import AlbumsItem from './components/AlbumsItem';
import { fetchAlbum} from './albumThunks';
import { useParams } from 'react-router-dom';
import { selectUser } from '../users/usersSlice';

const Album = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchAlbum(id));
  }, [dispatch, id]);
  return (
    <Grid container spacing={2}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {albums.map((album) => {
            if(user && user.role === 'admin'){
              return (
                <AlbumsItem
                  key={album._id}
                  id={album._id}
                  title={album.title}
                  year={album.year}
                  image={album.image}
                  isPublished={album.isPublished}
                />
              )
            }else if(album.isPublished === true) {
              return (
                <AlbumsItem
                  key={album._id}
                  id={album._id}
                  title={album.title}
                  year={album.year}
                  image={album.image}
                  isPublished={album.isPublished}
                />
              )
            }
          })}
        </Grid>
      )}
    </Grid>
  );
};

export default Album;