import { useEffect } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTracks } from './trackThunks';
import TrackstItem from './components/TrackstItem';
import { selectLoading, selectTracks } from './trackSlice';
import { useParams } from 'react-router-dom';


const Track = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchTracks(id));
  }, [dispatch, id]);
  return (
    <Grid container spacing={2}>
      {loading ? <CircularProgress/>: tracks.map((track) => (
        <TrackstItem
          key={track._id}
          id={track._id}
          name={track.name}
          duration={track.duration}
          tracksNumber={track.tracksNumber}
        />
      ))}
    </Grid>
  );
};

export default Track;