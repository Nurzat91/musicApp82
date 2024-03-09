import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  styled,
  Typography
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { apiURL } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { publishLoading, removeLoading } from '../artistSlice';
import { deleteArtist, fetchArtists, publishedArtist } from '../artistThunks';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});
interface Props {
  id: string;
  name: string;
  info: string;
  image: string | null;
  isPublished: boolean;
}

const ArtistItem: React.FC<Props> = ({id, name, info, image, isPublished }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const deleting = useAppSelector(removeLoading);
  const toggling = useAppSelector(publishLoading);
  let cardImage;
  if (image) {
    cardImage =   apiURL + '/' + image;
  }

  const remove = async (id: string) => {
    await dispatch(deleteArtist(id)).unwrap();
    await dispatch(fetchArtists());
  };

  const published = async (id: string) => {
    await dispatch(publishedArtist(id));
    await dispatch(fetchArtists());
  };


  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card id={id} sx={{height: '100%'}}>
        <Typography variant="h5" m={2}>{name}</Typography>
        <ImageCardMedia image={cardImage}/>
        <CardContent>
          <Typography variant="h6" m={2} sx={{height: '80px'}}>{info}</Typography>
          {user?.role === 'admin' &&
            <Box>
              <Typography>{isPublished ? '' : 'Album was not published yet'} </Typography>
              <CardActions>
                <Button
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
              </CardActions>
            </Box>
          }
        </CardContent>
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