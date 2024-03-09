import React from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { HistoryMutation } from '../../../types';
import { postHistory } from '../../trackHistory/TrackHistoryThunks';
import { publishLoading, removeLoading } from '../trackSlice';
import { deleteTracks, fetchTracks, publishedTracks } from '../trackThunks';
interface Props {
  id: string;
  name: string;
  duration: string;
  tracksNumber: number
  isPublished: boolean;
}
const TrackstItem: React.FC<Props> = ({id, tracksNumber, name, duration, isPublished}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const deleting = useAppSelector(removeLoading);
  const toggling = useAppSelector(publishLoading);
  const addTrackHistory = async (track: HistoryMutation) => {
    await dispatch(postHistory(track));
  };

  const remove = async (id: string) => {
    await dispatch(deleteTracks(id)).unwrap();
    await dispatch(fetchTracks(id));
  };

  const published = async (id: string) => {
    await dispatch(publishedTracks(id));
    await dispatch(fetchTracks(id));
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card id={id} sx={{height: '100%'}}>
        <Typography variant="h5" m={2}>{tracksNumber}</Typography>
        <Typography variant="h5" m={2}>{name}</Typography>
        <CardContent>
          <Typography variant="h6" m={2} sx={{height: '80px'}}>Продолжительность: { duration}</Typography>
          {user && (
            <Button onClick={() => addTrackHistory({track: id})}><PlayArrowIcon/></Button>
          )}
          {user?.role === 'admin' &&
            <Grid>
              <Typography sx={{ marginY: '10px'}}>{isPublished ? '' : 'Album was not published yet'} </Typography>
              <Box>
                <Button
                  sx={{ marginRight: '10px'}}
                  variant="contained"
                  onClick={() => remove(id)}
                  disabled={deleting}
                >
                  {deleting ?
                    <Box sx={{display: 'flex'}}>
                      <CircularProgress/>
                    </Box> : 'Delete'
                  }
                </Button>

                <Button
                  variant="contained"
                  onClick={() => published(id)}
                  disabled={toggling}
                >
                  {toggling ?
                    <Box sx={{display: 'flex'}}>
                      <CircularProgress/>
                    </Box> : isPublished ? 'Unpublish' : 'Publish'
                  }
                </Button>
              </Box>
            </Grid>
          }
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackstItem;