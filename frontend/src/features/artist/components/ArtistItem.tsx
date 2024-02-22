import React from 'react';
import {CardMedia, Grid, Paper, Typography, styled} from '@mui/material';
import { apiURL } from '../../../constants';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});
interface Props {
  id: string;
  name: string;
  info: string;
  image: string | null;
}

const ArtistItem: React.FC<Props> = ({id, name, info, image }) => {
  let cardImage;
  if (image) {
    cardImage =   apiURL + '/' + image;
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper id={id} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h4" m={2}>{name}</Typography>
        <ImageCardMedia image={cardImage}/>
        <Typography variant="body1" m={2}>{info}</Typography>
      </Paper>
    </Grid>
  );
};

export default ArtistItem;