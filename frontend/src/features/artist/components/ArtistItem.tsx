import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  styled,
  Typography
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
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
      <Card id={id} sx={{height: '100%'}}>
        <Typography variant="h5" m={2}>{name}</Typography>
        <ImageCardMedia image={cardImage}/>
        <CardContent><Typography variant="h6" m={2} sx={{height: '80px'}}>{info}</Typography></CardContent>
        <CardActions>
          <IconButton component={Link} to={'/albums/' + id}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistItem;