import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
interface Props {
  id: string;
  name: string;
  duration: string;
  tracksNumber: number
}
const TrackstItem: React.FC<Props> = ({id, tracksNumber, name, duration}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card id={id} sx={{height: '100%'}}>
        <Typography variant="h5" m={2}>{tracksNumber}</Typography>
        <Typography variant="h5" m={2}>{name}</Typography>
        <CardContent>
          <Typography variant="h6" m={2} sx={{height: '80px'}}>{duration}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackstItem;