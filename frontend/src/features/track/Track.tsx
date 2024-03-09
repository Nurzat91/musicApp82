import { useEffect } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTracks } from './trackThunks';
import TrackstItem from './components/TrackstItem';
import { selectLoading, selectTracks } from './trackSlice';
import { useParams } from 'react-router-dom';
import { selectUser } from '../users/usersSlice';


const Track = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const loading = useAppSelector(selectLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchTracks(id));
  }, [dispatch, id]);
  return (
    <Grid container spacing={2}>
      {loading ? <CircularProgress/>: tracks.map((track) => {
        if(user && user.role === 'admin') {
          return (
            <TrackstItem
              key={track._id}
              id={track._id}
              name={track.name}
              duration={track.duration}
              tracksNumber={track.tracksNumber}
              isPublished={track.isPublished}
            />
          )
        }else if(track.isPublished === true){
          return (
            <TrackstItem
              key={track._id}
              id={track._id}
              name={track.name}
              duration={track.duration}
              tracksNumber={track.tracksNumber}
              isPublished={track.isPublished}
            />
          )
        }

      })}
    </Grid>
  );
};

export default Track;