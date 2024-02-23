import React from 'react';
import { Card, CardMedia, Grid, Typography, styled, CardContent, CardActions, IconButton } from '@mui/material';
import { apiURL } from '../../../constants';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link} from 'react-router-dom';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});
interface Props {
  id: string;
  title: string;
  year: number;
  image: string | null;
}
const AlbumsItem: React.FC<Props>  = ({id, title, year, image}) => {

  let cardImage;
  if (image) {
    cardImage =   apiURL + '/' + image;
  }
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card id={id} sx={{height: '100%'}}>
        <Typography variant="h5" m={2}>{title}</Typography>
        <ImageCardMedia image={cardImage}/>
        <CardContent><Typography variant="h6" m={2} sx={{height: '80px'}}>{year}</Typography></CardContent>
        <CardActions>
          <IconButton component={Link} to={'/tracks/'}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumsItem;