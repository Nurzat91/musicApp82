import {
  Box,
  CircularProgress,
  Grid, Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { fetchHistory } from './TrackHistoryThunks';
import { selectFetchLoading, selectTracksHistory } from './TrackHistorySlice';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const historyItem = useAppSelector(selectTracksHistory);
  const loading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h2>Here goes list of tracks that were listened by {user?.displayName} </h2>
      {loading ? <Box sx={{display: 'flex'}}>
          <CircularProgress/>
        </Box> :
        <Grid item container spacing={2}>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name of track</TableCell>
                  <TableCell align="left">Artist</TableCell>
                  <TableCell align="left">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyItem.map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell component="th" scope="row">
                      {item.track.name}
                    </TableCell>
                    <TableCell align="left">{item.artist.name}</TableCell>
                    <TableCell align="left">{dayjs(item.datetime).format('DD.MM.YYYY HH:mm:ss')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>}
    </>
  );
};


export default TrackHistory;