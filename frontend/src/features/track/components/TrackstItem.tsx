import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { HistoryMutation } from '../../../types';
import { postHistory } from '../../trackHistory/TrackHistoryThunks';
interface Props {
  id: string;
  name: string;
  duration: string;
  tracksNumber: number
}
const TrackstItem: React.FC<Props> = ({id, tracksNumber, name, duration}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const addTrackHistory = async (track: HistoryMutation) => {
    await dispatch(postHistory(track));
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card id={id} sx={{height: '100%'}}>
        <Typography variant="h5" m={2}>{tracksNumber}</Typography>
        <Typography variant="h5" m={2}>{name}</Typography>
        <CardContent>
          <Typography variant="h6" m={2} sx={{height: '80px'}}>{duration}</Typography>
        </CardContent>
        {user && (
          <Button onClick={() => addTrackHistory({track: id})}><PlayArrowIcon/></Button>
        )}
      </Card>
    </Grid>
  );
};

export default TrackstItem;