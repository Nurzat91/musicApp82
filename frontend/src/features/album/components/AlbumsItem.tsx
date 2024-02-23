import React from 'react';
import { Card, CardMedia, Grid, Typography, styled, CardContent, CardActions, IconButton } from '@mui/material';
import { apiURL } from '../../../constants';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link} from 'react-router-dom';
import { useAppDispatch} from '../../../app/hooks';
import { fetchOneAlbum } from '../albumThunks';

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

  const dispatch = useAppDispatch();

  let cardImage;
  if (image) {
    cardImage = image ? apiURL + '/' + image : '';
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card id={id} sx={{height: '100%'}}>
        <Typography variant="h5" m={2}>{title}</Typography>
        <CardContent><Typography variant="h6" m={2} sx={{height: '80px'}}>{year}</Typography></CardContent>
        {cardImage && <ImageCardMedia image={cardImage} />}
        <CardActions>
          <IconButton
            component={Link}
            to={`/tracks/${id}`}
            onClick={() => {
              dispatch(fetchOneAlbum(id));
            }}
          >
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumsItem;